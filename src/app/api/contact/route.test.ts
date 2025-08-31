import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { createMockNextRequest } from '@/test/utils'

// Mock SendGrid
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    setDataResidency: vi.fn(),
    send: vi.fn().mockResolvedValue([{ statusCode: 202 }]),
  },
}))

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should send email successfully with valid data', async () => {
    const mockRequest = createMockNextRequest('POST', {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      message: 'I am interested in your AI chatbot solutions',
      industry: 'Legal',
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Email sent successfully')
  })

  it('should return 400 for missing required fields', async () => {
    const mockRequest = createMockNextRequest('POST', {
      name: 'John Doe',
      // Missing email
      message: 'Test message',
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Missing required fields')
  })

  it('should return 400 for invalid email format', async () => {
    const mockRequest = createMockNextRequest('POST', {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Test message',
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Invalid email address')
  })

  it('should handle SendGrid errors gracefully', async () => {
    const sgMail = await import('@sendgrid/mail')
    vi.mocked(sgMail.default.send).mockRejectedValueOnce(
      new Error('SendGrid API error')
    )

    const mockRequest = createMockNextRequest('POST', {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Failed to send email')
  })

  it('should configure EU data residency when SENDGRID_EU is true', async () => {
    process.env.SENDGRID_EU = 'true'
    const sgMail = await import('@sendgrid/mail')

    const mockRequest = createMockNextRequest('POST', {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    })

    await POST(mockRequest)

    expect(sgMail.default.setDataResidency).toHaveBeenCalledWith('eu')
    
    // Clean up
    delete process.env.SENDGRID_EU
  })

  it('should handle malformed JSON in request body', async () => {
    const mockRequest = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    })

    const response = await POST(mockRequest as any)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('Invalid request')
  })
})
