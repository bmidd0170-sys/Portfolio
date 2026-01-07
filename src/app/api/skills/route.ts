import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const fallbackSkills: Array<{ category: string; skills: string[] }> = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Firebase'],
  },
  {
    category: 'Other',
    skills: ['Web Performance', 'SEO', 'Testing', 'Agile', 'UI/UX Design'],
  },
]

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set, returning fallback skills.')
      return NextResponse.json(fallbackSkills)
    }

    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
    })

    if (!skills || skills.length === 0) {
      return NextResponse.json(fallbackSkills)
    }

    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(fallbackSkills)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, skills } = body

    if (!category || !skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const skill = await prisma.skill.create({
      data: {
        category,
        skills: Array.isArray(skills) ? skills : [skills],
      },
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}
