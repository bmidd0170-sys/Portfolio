"use client";

import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  imageUrl: string | null;
}

const defaultProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js and Stripe integration for seamless payment processing.",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "#",
    imageUrl: null,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, user authentication, and drag-and-drop functionality.",
    tags: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    link: "#",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "An interactive weather dashboard that displays real-time weather data with beautiful visualizations and location-based features.",
    tags: ["Next.js", "API Integration", "Chart.js", "Geolocation"],
    link: "#",
    imageUrl: null,
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics tool for tracking social media performance with detailed insights and customizable reports.",
    tags: ["React", "GraphQL", "Node.js", "PostgreSQL"],
    link: "#",
    imageUrl: null,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data.length > 0 ? data : defaultProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">Featured Projects</h2>
      {loading && <p className="text-center text-slate-600">Loading projects...</p>}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link || "#"}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
