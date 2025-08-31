import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'

// Custom render function that includes providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  // Add any global providers here (Theme, Auth, etc.)
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock API response helper
export function mockApiResponse(data: any, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers({
      'content-type': 'application/json',
    }),
  } as Response)
}

// Mock Stripe webhook event
export function mockStripeWebhookEvent(type: string, data: any) {
  return {
    id: 'evt_test_' + Math.random().toString(36).substring(7),
    object: 'event',
    api_version: '2025-08-27.basil',
    created: Date.now() / 1000,
    data: {
      object: data,
    },
    livemode: false,
    pending_webhooks: 1,
    request: {
      id: 'req_test_' + Math.random().toString(36).substring(7),
      idempotency_key: null,
    },
    type,
  }
}

// Mock Tavus webhook event
export function mockTavusWebhookEvent(event: string, data: any) {
  return {
    event,
    timestamp: new Date().toISOString(),
    data,
    signature: 'mock_signature',
  }
}

// Create mock NextRequest for API route testing
export function createMockNextRequest(
  method: string,
  body?: any,
  headers?: Record<string, string>
) {
  const url = 'http://localhost:3000/api/test'
  const request = new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  
  return request as any // Type assertion for Next.js Request compatibility
}

// Wait for async updates
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0))

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { renderWithProviders as render }
