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

  // Flatten all skills into a single array
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  // Generate random positions and animation for each skill (random float)
  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  // Store positions and animation state for interactivity
  const [positions, setPositions] = useState(() =>
    allSkills.map(() => ({ dx: 0, dy: 0 }))
  );
  const floatingSkills = allSkills.map((skill, i) => {
    // Increase spread for further apart circles
    const x = getRandom(-520, 520);
    const y = getRandom(0, 260);
    const delay = getRandom(0, 2);
    const duration = getRandom(3.5, 6);
    const floatX = getRandom(-32, 32);
    const floatY = getRandom(24, 64);
    return { skill, x, y, delay, duration, floatX, floatY };
  });

  return (
    <section
      id="skills"
      className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-start relative z-10 bg-transparent min-h-[600px]"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-24 text-center">Skills & Expertise</h2>
      {loading && <p className="text-center text-slate-600">Loading skills...</p>}
      <div className="relative w-full h-[480px] flex items-center justify-center select-none">
        {floatingSkills.map(({ skill, x, y, delay, duration, floatX, floatY }, i) => (
          <span
            key={skill}
            className="absolute flex items-center justify-center rounded-full shadow-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-lg transition-transform duration-200"
            style={{
              width: 96,
              height: 96,
              left: `calc(50% + ${x}px - 48px)`,
              top: `calc(0px + 64px + ${y}px)`,
              animation: `floatXY${i} ${duration}s ease-in-out infinite alternate`,
              animationDelay: `${delay}s`,
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transform: `translate(${positions[i]?.dx || 0}px, ${positions[i]?.dy || 0}px)`
            }}
            onMouseMove={e => {
              // Move the circle away from the mouse pointer
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const mx = e.clientX;
              const my = e.clientY;
              const dx = mx - cx;
              const dy = my - cy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              // Move away up to 40px, proportional to closeness
              const move = dist < 120 ? (40 * (1 - dist / 120)) : 0;
              const angle = Math.atan2(dy, dx);
              setPositions(pos => {
                const newPos = [...pos];
                newPos[i] = {
                  dx: -Math.cos(angle) * move,
                  dy: -Math.sin(angle) * move,
                };
                return newPos;
              });
            }}
            onMouseLeave={() => {
              setPositions(pos => {
                const newPos = [...pos];
                newPos[i] = { dx: 0, dy: 0 };
                return newPos;
              });
            }}
          >
            <span className="w-full h-full flex items-center justify-center text-center px-2">
              {skill}
            </span>
            <style>{`
              @keyframes floatXY${i} {
                0% { transform: scale(1); }
                100% { transform: translate(${floatX}px, -${floatY}px) scale(1.08); }
              }
            `}</style>
          </span>
        ))}
      </div>
    </section>
  );
}
