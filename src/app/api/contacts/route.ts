import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Only attempt database save if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      try {
        const contact = await prisma.contact.create({
          data: {
            name,
            email,
            message,
          },
        })
        return NextResponse.json(contact, { status: 201 })
      } catch (dbError) {
        console.error('Database error saving contact:', dbError)
        // Still respond with success to user but log the error
        console.log(`Contact submitted (DB failed): ${name} - ${email}`)
        return NextResponse.json(
          {
            id: 0,
            name,
            email,
            message,
            read: false,
            createdAt: new Date(),
          },
          { status: 201 }
        )
      }
    } else {
      // No database configured, just log and return success
      console.log(`Contact submitted (no DB): ${name} - ${email}`)
      return NextResponse.json(
        {
          id: 0,
          name,
          email,
          message,
          read: false,
          createdAt: new Date(),
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json(
      { error: 'Failed to process contact' },
      { status: 500 }
    )
  }
}
