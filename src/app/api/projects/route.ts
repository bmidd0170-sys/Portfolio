import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const fallbackProjects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern portfolio built with Next.js, React, and Tailwind CSS.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    link: 'https://example.com',
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set, returning fallback projects.')
      return NextResponse.json(fallbackProjects)
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })

    if (!projects || projects.length === 0) {
      return NextResponse.json(fallbackProjects)
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(fallbackProjects)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, tags, link, imageUrl } = body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags: Array.isArray(tags) ? tags : [tags],
        link,
        imageUrl,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
