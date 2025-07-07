import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, message, subject } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Prepare email content
    const emailSubject = subject || 'New Contact Form Submission - AI Chatbot Solutions'
    
    // Email to admin/sales team
    const adminEmail = {
      to: process.env.SENDGRID_FROM_EMAIL || 'hello@aichatbotsolutions.io',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@aichatbotsolutions.io',
        name: 'AI Chatbot Solutions'
      },
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E64E0;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1E64E0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #1E64E0; font-weight: bold;">
              📧 Submitted from: AI Chatbot Solutions Contact Form
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
              Timestamp: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    }

    // Auto-response email to customer
    const customerEmail = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@aichatbotsolutions.io',
        name: 'AI Chatbot Solutions'
      },
      subject: 'Thank you for contacting AI Chatbot Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #1E64E0;">
            <h1 style="color: #1E64E0; margin: 0;">AI Chatbot Solutions</h1>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #1E64E0;">Thank you for your inquiry, ${name}!</h2>
            
            <p>We've received your message and our team will get back to you within 24 hours. In the meantime, here are some helpful resources:</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1E64E0; margin-top: 0;">Quick Links:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0;">
                  🚀 <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" style="color: #1E64E0; text-decoration: none;">View King Plan Pricing</a>
                </li>
                <li style="margin: 10px 0;">
                  📚 <a href="${process.env.NEXT_PUBLIC_APP_URL}/#faq" style="color: #1E64E0; text-decoration: none;">Frequently Asked Questions</a>
                </li>
                <li style="margin: 10px 0;">
                  💬 <strong>Start a free trial:</strong> No credit card required!
                </li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #1E64E0, #6FF35F); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Ready to get started?</h3>
              <p style="margin: 0 0 15px 0;">Get the BotPenguin King Plan for just $199/month (50% off)</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" 
                 style="background: white; color: #1E64E0; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Start Free Trial
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                <strong>Your message summary:</strong><br>
                ${message.length > 200 ? message.substring(0, 200) + '...' : message}
              </p>
            </div>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              AI Chatbot Solutions | Powered by BotPenguin<br>
              <a href="mailto:hello@aichatbotsolutions.io" style="color: #1E64E0;">hello@aichatbotsolutions.io</a>
            </p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(customerEmail)
    ])

    // Log successful submission for analytics
    console.log('Contact form submission:', {
      name,
      email,
      company,
      subject: subject || 'General Inquiry',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you within 24 hours!' 
    })
    
  } catch (error) {
    console.error('Error sending contact form email:', error)
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}