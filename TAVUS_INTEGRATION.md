# 🎥 Tavus Video AI Integration Guide

This guide provides comprehensive documentation for integrating Tavus.io's conversational video AI platform with the AI Chatbot Solutions website.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [API Integration](#api-integration)
5. [Webhook Configuration](#webhook-configuration)
6. [Real-time Updates](#real-time-updates)
7. [Industry-Specific Avatars](#industry-specific-avatars)
8. [Testing](#testing)
9. [Production Deployment](#production-deployment)
10. [Troubleshooting](#troubleshooting)

## Overview

Tavus.io provides AI-powered conversational video experiences that can be integrated into chatbot solutions for legal and healthcare practices. This integration enables:

- **Video-based consultations**: AI avatars that can conduct initial client/patient consultations
- **Personalized interactions**: Industry-specific knowledge and communication styles
- **HIPAA compliance**: Secure handling of healthcare data
- **Multi-language support**: Serve diverse client populations
- **24/7 availability**: Round-the-clock video consultation capabilities

## Prerequisites

Before integrating Tavus:

1. **Tavus Account**: Sign up at [tavus.io](https://tavus.io) and obtain API credentials
2. **Avatar Creation**: Create industry-specific avatars through Tavus dashboard
3. **Webhook Endpoint**: Publicly accessible URL for receiving Tavus events
4. **SSL Certificate**: HTTPS required for production deployments

## Environment Configuration

Add these variables to your `.env.local` or production environment:

```env
# Required Tavus Configuration
TAVUS_API_KEY=tav_api_xxxxxxxxxxxxxxxxxxxxxxxx
TAVUS_WEBHOOK_SECRET=tav_whsec_xxxxxxxxxxxxxxxxxxxxxxxx

# Optional Configuration
TAVUS_BASE_URL=https://api.tavus.io/v2  # Default API endpoint
TAVUS_WEBHOOK_URL=https://yourdomain.com/api/tavus/webhook

# Avatar IDs for different industries
TAVUS_DEFAULT_AVATAR_ID=avatar_default_xxxxxxxxxxxx
TAVUS_LEGAL_AVATAR_ID=avatar_legal_xxxxxxxxxxxx
TAVUS_HEALTHCARE_AVATAR_ID=avatar_healthcare_xxxxxxxxxxxx

# Feature flag
NEXT_PUBLIC_ENABLE_TAVUS=true
```

## API Integration

### Server-Side API Client

Create `/src/lib/tavus.ts`:

```typescript
import 'server-only';
import { TavusAvatar, TavusConversation } from '@/types';

const TAVUS_API_KEY = process.env.TAVUS_API_KEY!;
const TAVUS_BASE_URL = process.env.TAVUS_BASE_URL || 'https://api.tavus.io/v2';

class TavusClient {
  private headers = {
    'Authorization': `Bearer ${TAVUS_API_KEY}`,
    'Content-Type': 'application/json',
  };

  async createConversation(params: {
    avatarId: string;
    userId: string;
    metadata?: Record<string, unknown>;
  }): Promise<TavusConversation> {
    const response = await fetch(`${TAVUS_BASE_URL}/conversations`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        avatar_id: params.avatarId,
        user_id: params.userId,
        metadata: params.metadata,
        webhook_url: process.env.TAVUS_WEBHOOK_URL,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getConversation(conversationId: string): Promise<TavusConversation> {
    const response = await fetch(
      `${TAVUS_BASE_URL}/conversations/${conversationId}`,
      { headers: this.headers }
    );

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }

  async listAvatars(): Promise<TavusAvatar[]> {
    const response = await fetch(`${TAVUS_BASE_URL}/avatars`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`Tavus API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const tavusClient = new TavusClient();
```

### API Route Handler

Create `/src/app/api/tavus/conversation/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { tavusClient } from '@/lib/tavus';

const createConversationSchema = z.object({
  industry: z.enum(['legal', 'healthcare', 'general']),
  userId: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { industry, userId, metadata } = createConversationSchema.parse(body);

    // Select avatar based on industry
    const avatarId = 
      industry === 'legal' ? process.env.TAVUS_LEGAL_AVATAR_ID :
      industry === 'healthcare' ? process.env.TAVUS_HEALTHCARE_AVATAR_ID :
      process.env.TAVUS_DEFAULT_AVATAR_ID;

    if (!avatarId) {
      return NextResponse.json(
        { error: 'Avatar configuration missing' },
        { status: 500 }
      );
    }

    const conversation = await tavusClient.createConversation({
      avatarId,
      userId,
      metadata: {
        ...metadata,
        industry,
        source: 'website',
        created_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error('Error creating Tavus conversation:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
```

## Webhook Configuration

### Webhook Handler

Create `/src/app/api/tavus/webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { isTavusWebhookEvent, type TavusWebhookEvent } from '@/types';

const TAVUS_WEBHOOK_SECRET = process.env.TAVUS_WEBHOOK_SECRET!;

// Webhook event schema
const webhookEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    'conversation.started',
    'conversation.ended',
    'conversation.transcribed',
    'avatar.created',
    'avatar.updated',
    'video.generated',
    'video.failed',
  ]),
  created: z.number(),
  data: z.object({
    conversationId: z.string().optional(),
    avatarId: z.string().optional(),
    videoId: z.string().optional(),
    status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
    transcript: z.string().optional(),
    duration: z.number().optional(),
    metadata: z.record(z.unknown()).optional(),
  }),
});

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-tavus-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature, TAVUS_WEBHOOK_SECRET)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = webhookEventSchema.parse(JSON.parse(body));

    // Process webhook event
    await processWebhookEvent(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid webhook data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function processWebhookEvent(event: TavusWebhookEvent) {
  console.info(`Processing Tavus webhook: ${event.type}`, {
    eventId: event.id,
    data: event.data,
  });

  switch (event.type) {
    case 'conversation.started':
      // Track conversation start
      await trackAnalyticsEvent({
        event: 'tavus_conversation_started',
        properties: {
          conversationId: event.data.conversationId,
          avatarId: event.data.avatarId,
        },
      });
      break;

    case 'conversation.ended':
      // Process completed conversation
      if (event.data.transcript) {
        await processTranscript(
          event.data.conversationId!,
          event.data.transcript
        );
      }
      break;

    case 'conversation.transcribed':
      // Handle transcript availability
      await notifyTranscriptReady(event.data.conversationId!);
      break;

    case 'video.generated':
      // Handle video generation completion
      await notifyVideoReady(event.data.videoId!);
      break;

    case 'video.failed':
      // Handle video generation failure
      console.error('Video generation failed:', event.data);
      await notifyVideoFailed(event.data.videoId!);
      break;

    default:
      console.warn(`Unhandled Tavus event type: ${event.type}`);
  }
}

// Helper functions (implement based on your needs)
async function trackAnalyticsEvent(event: any) {
  // Implement analytics tracking
}

async function processTranscript(conversationId: string, transcript: string) {
  // Process and store transcript
  // Could trigger follow-up actions, email notifications, etc.
}

async function notifyTranscriptReady(conversationId: string) {
  // Notify user that transcript is available
}

async function notifyVideoReady(videoId: string) {
  // Notify user that video is ready
}

async function notifyVideoFailed(videoId: string) {
  // Handle video generation failure
}
```

## Real-time Updates

For real-time conversation updates, implement Server-Sent Events (SSE):

### SSE Endpoint

Create `/src/app/api/tavus/stream/route.ts`:

```typescript
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get('conversationId');
  
  if (!conversationId) {
    return new Response('Missing conversationId', { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`)
      );

      // Set up event listener for Tavus updates
      // This would typically connect to a message queue or database
      const interval = setInterval(async () => {
        try {
          // Check for updates (implement based on your architecture)
          const update = await checkForUpdates(conversationId);
          
          if (update) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(update)}\n\n`)
            );
          }
        } catch (error) {
          console.error('SSE error:', error);
          controller.close();
          clearInterval(interval);
        }
      }, 1000);

      // Clean up on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

async function checkForUpdates(conversationId: string) {
  // Implement based on your data storage
  // Could query database, Redis, or other storage
  return null;
}
```

### Client-Side SSE Consumer

```typescript
// In a React component
useEffect(() => {
  if (!conversationId) return;

  const eventSource = new EventSource(
    `/api/tavus/stream?conversationId=${conversationId}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Tavus update:', data);
    // Handle update based on type
  };

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}, [conversationId]);
```

## Industry-Specific Avatars

### Legal Avatar Configuration

```json
{
  "id": "avatar_legal_xxxxxxxxxxxx",
  "name": "Legal Consultation Assistant",
  "personality": {
    "tone": "professional",
    "expertise": [
      "Initial consultations",
      "Case evaluation",
      "Document collection",
      "Appointment scheduling"
    ],
    "guidelines": [
      "Never provide legal advice",
      "Always recommend consulting with an attorney",
      "Maintain client confidentiality",
      "Use appropriate legal terminology"
    ]
  },
  "appearance": "professional_business",
  "voice": "professional_female_us"
}
```

### Healthcare Avatar Configuration

```json
{
  "id": "avatar_healthcare_xxxxxxxxxxxx",
  "name": "Healthcare Intake Assistant",
  "personality": {
    "tone": "empathetic",
    "expertise": [
      "Patient intake",
      "Symptom documentation",
      "Appointment scheduling",
      "Insurance verification"
    ],
    "guidelines": [
      "Never provide medical diagnosis",
      "Maintain HIPAA compliance",
      "Show empathy and understanding",
      "Encourage professional medical consultation"
    ]
  },
  "appearance": "medical_professional",
  "voice": "caring_female_us"
}
```

## Testing

### Unit Tests

```typescript
// __tests__/tavus.test.ts
import { tavusClient } from '@/lib/tavus';

describe('Tavus Integration', () => {
  it('should create a conversation', async () => {
    const conversation = await tavusClient.createConversation({
      avatarId: 'test_avatar',
      userId: 'test_user',
      metadata: { test: true },
    });

    expect(conversation).toHaveProperty('id');
    expect(conversation.avatarId).toBe('test_avatar');
  });

  it('should verify webhook signatures correctly', () => {
    const payload = '{"test": "data"}';
    const secret = 'test_secret';
    const signature = createSignature(payload, secret);

    expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
  });
});
```

### Integration Tests

```typescript
// e2e/tavus.spec.ts
import { test, expect } from '@playwright/test';

test('should start Tavus conversation', async ({ page }) => {
  await page.goto('/demo');
  
  // Click start conversation button
  await page.click('[data-testid="start-tavus-conversation"]');
  
  // Wait for Tavus iframe to load
  await page.waitForSelector('iframe[src*="tavus.io"]');
  
  // Verify conversation started
  const iframe = page.frameLocator('iframe[src*="tavus.io"]');
  await expect(iframe.locator('.tavus-video')).toBeVisible();
});
```

## Production Deployment

### Vercel Deployment

1. **Environment Variables**: Add all Tavus variables in Vercel dashboard
2. **Webhook URL**: Set to `https://yourdomain.vercel.app/api/tavus/webhook`
3. **CORS Configuration**: Configure allowed origins in Tavus dashboard

### Security Checklist

- [ ] API keys stored securely in environment variables
- [ ] Webhook signature verification enabled
- [ ] HTTPS enforced for all endpoints
- [ ] Rate limiting implemented on API routes
- [ ] Error messages don't expose sensitive information
- [ ] Logging configured for webhook events
- [ ] HIPAA compliance for healthcare implementations

### Monitoring

```typescript
// instrumentation.ts
import * as Sentry from '@sentry/nextjs';

export function register() {
  // Monitor Tavus API calls
  Sentry.addGlobalEventProcessor((event) => {
    if (event.request?.url?.includes('tavus.io')) {
      event.fingerprint = ['tavus-api-call'];
      event.tags = {
        ...event.tags,
        service: 'tavus',
      };
    }
    return event;
  });
}
```

## Troubleshooting

### Common Issues

1. **Webhook Signature Verification Fails**
   - Ensure `TAVUS_WEBHOOK_SECRET` matches dashboard configuration
   - Check for request body modifications by proxies/middleware

2. **Avatar Not Loading**
   - Verify avatar ID is correct
   - Check Tavus account has sufficient credits
   - Ensure CORS is properly configured

3. **Conversation Disconnects**
   - Check network stability
   - Verify WebSocket connections aren't blocked
   - Review browser console for errors

4. **Transcript Not Received**
   - Confirm webhook endpoint is accessible
   - Check webhook event logs in Tavus dashboard
   - Verify conversation completed successfully

### Debug Mode

Enable debug logging:

```typescript
// lib/tavus.ts
const DEBUG = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

if (DEBUG) {
  console.log('Tavus API Request:', {
    url,
    method,
    headers: { ...headers, Authorization: '[REDACTED]' },
    body,
  });
}
```

## Support

- **Tavus Documentation**: [docs.tavus.io](https://docs.tavus.io)
- **API Reference**: [api.tavus.io/docs](https://api.tavus.io/docs)
- **Support Email**: support@tavus.io
- **Status Page**: [status.tavus.io](https://status.tavus.io)

## License

This integration is provided under the same license as the AI Chatbot Solutions project. Tavus.io is a separate service with its own terms of service and pricing.
