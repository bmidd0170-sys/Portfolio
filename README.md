# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## Features

- 🎨 **Beautiful Design** - Modern, clean, and responsive UI
- 🌓 **Dark Mode** - Built-in dark mode support
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js and Turbopack
- 🎯 **SEO Ready** - Proper meta tags and structured data
- 🎪 **Smooth Animations** - Smooth scroll behavior and transitions
- 📧 **Contact Form** - Functional contact form component

## Sections

1. **Hero** - Eye-catching intro section with call-to-action buttons
2. **About** - Personal introduction with profile image
3. **Projects** - Showcase of featured projects with descriptions
4. **Skills** - Technical skills organized by category
5. **Contact** - Contact form and social links
6. **Navigation** - Sticky header with mobile menu

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Font Family
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Customization

### Update Your Information

Edit the following components to add your own content:

- **Hero Section**: `src/components/Hero.tsx`
- **About Section**: `src/components/About.tsx`
- **Projects**: Update the `projects` array in `src/components/Projects.tsx`
- **Skills**: Update the `skillCategories` array in `src/components/Skills.tsx`
- **Contact Links**: Update links in `src/components/Contact.tsx` and `src/components/Footer.tsx`

### Customize Styling

- Update Tailwind classes in component files
- Modify CSS utilities in `src/app/globals.css`

## Component Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Header.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Projects.tsx
    ├── Skills.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com). Push your code to GitHub and import the repository to Vercel.
