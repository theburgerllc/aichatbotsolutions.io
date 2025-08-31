import { NextRequest, NextResponse } from 'next/server'

const TAVUS_API_KEY = process.env.TAVUS_API_KEY
const TAVUS_PERSONA_ID = process.env.TAVUS_PERSONA_ID
const TAVUS_REPLICA_ID = process.env.TAVUS_REPLICA_ID

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!TAVUS_API_KEY || !TAVUS_PERSONA_ID) {
      console.error('Missing Tavus configuration')
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json().catch(() => ({}))
    
    // Extract user context from request
    const { 
      name = 'Guest',
      email = '',
      context = '',
      industry = 'general'
    } = body

    // Create conversation with Tavus API
    const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona_id: TAVUS_PERSONA_ID,
        replica_id: TAVUS_REPLICA_ID,
        conversation_name: `Chat with ${name} - ${new Date().toISOString()}`,
        conversational_context: context || `Industry: ${industry}. User: ${name}`,
        // Optional: Add custom properties
        properties: {
          user_name: name,
          user_email: email,
          industry: industry,
          source: 'website',
          timestamp: new Date().toISOString(),
        },
        // Optional: Configure specific settings
        enable_recording: true,
        language: 'en',
      }),
    })

    if (!tavusResponse.ok) {
      const errorData = await tavusResponse.text()
      console.error('Tavus API error:', tavusResponse.status, errorData)
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: tavusResponse.status }
      )
    }

    const data = await tavusResponse.json()

    // Return the conversation URL to the client
    return NextResponse.json({
      success: true,
      conversation_url: data.conversation_url,
      conversation_id: data.conversation_id,
      // Optional: Return additional metadata
      expires_at: data.expires_at,
    })
  } catch (error) {
    console.error('Error creating Tavus conversation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'tavus-conversation',
    configured: !!(TAVUS_API_KEY && TAVUS_PERSONA_ID),
  })
}
