// ===== Core Domain Types =====

export interface ServicePlan {
  id: 'legal' | 'healthcare';
  name: string;
  description: string;
  price: {
    setup: number;
    monthly: number;
    currency: 'USD';
  };
  features: string[];
  compliance: string[];
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface Lead {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  industry: 'legal' | 'healthcare' | 'other';
  message: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry: 'legal' | 'healthcare' | 'other';
  message: string;
  consent: boolean;
}

// ===== Stripe Types =====

export interface StripeWebhookEvent {
  id: string;
  object: 'event';
  api_version: string;
  created: number;
  data: {
    object: Record<string, unknown>;
    previous_attributes?: Record<string, unknown>;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string;
}

export interface CheckoutSessionData {
  planId: 'legal' | 'healthcare';
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

// ===== Tavus Integration Types =====

export interface TavusConfig {
  apiKey: string;
  webhookSecret: string;
  baseUrl?: string;
  modelId?: string;
}

export interface TavusWebhookEvent {
  id: string;
  type: TavusEventType;
  created: number;
  data: TavusEventData;
  signature?: string;
}

export type TavusEventType = 
  | 'conversation.started'
  | 'conversation.ended'
  | 'conversation.transcribed'
  | 'avatar.created'
  | 'avatar.updated'
  | 'avatar.deleted'
  | 'video.generated'
  | 'video.failed';

export interface TavusEventData {
  conversationId?: string;
  avatarId?: string;
  videoId?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  transcript?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
  };
}

export interface TavusConversation {
  id: string;
  avatarId: string;
  userId: string;
  startedAt: Date;
  endedAt?: Date;
  transcript?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  topics?: string[];
  metadata?: Record<string, unknown>;
}

export interface TavusAvatar {
  id: string;
  name: string;
  description?: string;
  voiceId: string;
  personality?: {
    tone: 'professional' | 'friendly' | 'empathetic';
    expertise: string[];
    guidelines: string[];
  };
  industry?: 'legal' | 'healthcare';
  createdAt: Date;
  updatedAt: Date;
}

// ===== API Response Types =====

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: {
    timestamp: number;
    requestId: string;
    version: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ===== Analytics Types =====

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: number;
}

export interface ConversionEvent extends AnalyticsEvent {
  event: 'conversion';
  properties: {
    type: 'lead' | 'demo_request' | 'signup' | 'purchase';
    value?: number;
    currency?: string;
    planId?: string;
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

// ===== Environment Configuration =====

export interface EnvironmentConfig {
  // Core
  NODE_ENV: 'development' | 'test' | 'production';
  NEXT_PUBLIC_SITE_URL: string;
  
  // Analytics
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_GTM_ID?: string;
  
  // Stripe
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  NEXT_PUBLIC_STRIPE_LEGAL_PRICE_ID?: string;
  NEXT_PUBLIC_STRIPE_HEALTHCARE_PRICE_ID?: string;
  
  // Tavus
  TAVUS_API_KEY?: string;
  TAVUS_WEBHOOK_SECRET?: string;
  TAVUS_BASE_URL?: string;
  TAVUS_MODEL_ID?: string;
  
  // SendGrid
  SENDGRID_API_KEY?: string;
  SENDGRID_FROM_EMAIL?: string;
  SENDGRID_REPLY_TO_EMAIL?: string;
  
  // Sentry
  SENTRY_DSN?: string;
  SENTRY_ORG?: string;
  SENTRY_PROJECT?: string;
  SENTRY_AUTH_TOKEN?: string;
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_TAVUS?: 'true' | 'false';
  NEXT_PUBLIC_ENABLE_CHAT_WIDGET?: 'true' | 'false';
  NEXT_PUBLIC_USE_CHATBOTIFY?: 'true' | 'false';
}

// ===== Utility Types =====

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

// Type guard utilities
export const isTavusWebhookEvent = (event: unknown): event is TavusWebhookEvent => {
  return (
    typeof event === 'object' &&
    event !== null &&
    'id' in event &&
    'type' in event &&
    'data' in event
  );
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
};
