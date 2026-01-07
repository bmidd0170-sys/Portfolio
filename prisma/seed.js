import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await prisma.project.createMany({
    data: [
      {
        title: "Stratus Sphere",
        description:
          "A weather web application that provides real-time weather reports and assist you in your day plan/outfits accordingly.",
        tags: ["OpenAI API", "CSS", "React"],
        link: "https://stratus-sphere-flax.vercel.app",
        imageUrl: "/stratussphere-logo.svg",
      },
      {
        title: "Recipe Finder",
        description:
          "A website that helps users find recipes based on a provided image of a dish.",
        tags: ["React", "Node.js", "Firebase Auth", "OpenAI GPT-4"],
        link: "https://recipe-finder-gamma-ten.vercel.app",
        imageUrl: "/favicon.svg",
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      {
        category: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
      },
      {
        category: "Backend",
        skills: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
      },
      {
        category: "Tools & Platforms",
        skills: ["Git", "GitHub", "Vercel", "VS Code", "Figma"],
      },
      {
        category: "AI/ML",
        skills: ["OpenAI API", "GPT-4", "Prompt Engineering"],
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
