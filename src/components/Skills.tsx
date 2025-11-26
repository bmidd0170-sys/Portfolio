"use client";

import { useEffect, useState } from "react";

interface SkillCategory {
  id?: number;
  category: string;
  skills: string[];
}

const defaultSkills = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5/CSS3",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Firebase"],
  },
  {
    category: "Other",
    skills: ["Web Performance", "SEO", "Testing", "Agile", "UI/UX Design"],
  },
];

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(defaultSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkillCategories(data.length > 0 ? data : defaultSkills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkillCategories(defaultSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section-container bg-white dark:bg-slate-900">
      <h2 className="section-title">Skills & Expertise</h2>
      {loading && <p className="text-center text-slate-600">Loading skills...</p>}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {skillCategories.map((cat) => (
          <div key={cat.category}>
            <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
