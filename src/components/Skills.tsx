"use client";

import { useEffect, useMemo, useState } from "react";

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
      "HTML5/CSS3",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Vercel",
      "Firebase",
    ],
  },
  {
    category: "Other",
    skills: [
      "Web Performance",
      "Testing",
      "UI/UX Design",
    ],
  },
];

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(defaultSkills);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mode, setMode] = useState<"fun" | "boring">("fun");

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track mode changes
  useEffect(() => {
    const updateMode = () => {
      const currentMode = document.documentElement.dataset.mode as "fun" | "boring" | undefined;
      setMode(currentMode || "fun");
    };

    updateMode();

    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    return () => observer.disconnect();
  }, []);

  // Flatten all skills into a single array
  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const floatingSkills = useMemo(() => {
    if (!isClient) return [] as {
      skill: string;
      x: number;
      y: number;
      delay: number;
      duration: number;
      floatX: number;
      floatY: number;
    }[];

    const getRandom = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    return allSkills.map((skill) => {
      const x = getRandom(-520, 520);
      const y = getRandom(0, 260);
      const delay = getRandom(0, 2);
      const duration = getRandom(3.5, 6);
      const floatX = getRandom(-32, 32);
      const floatY = getRandom(24, 64);
      return { skill, x, y, delay, duration, floatX, floatY };
    });
  }, [isClient, allSkills]);

  // Boring mode: static grid layout
  if (mode === "boring") {
    return (
      <section
        id="skills"
        className="w-screen min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col items-center justify-start relative z-10 bg-transparent"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
        {loading && <p className="text-center text-slate-600">Loading skills...</p>}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div key={category.category} className="space-y-6">
              <h3 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3 text-center"
                  >
                    <span className="text-slate-800 dark:text-slate-100 font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Fun mode: floating bubbles
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
