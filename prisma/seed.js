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
