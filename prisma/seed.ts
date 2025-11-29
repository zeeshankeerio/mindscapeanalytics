import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  try {
    // Create an admin user
    const adminPassword = await hash("admin123", 12)
    
    await prisma.user.upsert({
      where: { email: "admin@mindscape.ai" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@mindscape.ai",
        password: adminPassword,
        role: "ADMIN",
      },
    })

    // Create a regular user
    const userPassword = await hash("user123", 12)
    
    const user = await prisma.user.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: {
        name: "Demo User",
        email: "user@example.com",
        password: userPassword,
        role: "USER",
      },
    })

    // Create a profile for the user
    try {
      await prisma.$queryRaw`
        INSERT INTO "Profile" ("id", "userId", "bio", "company", "position", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), ${user.id}, 'AI enthusiast and data scientist', 'Example Corp', 'Data Analyst', NOW(), NOW())
        ON CONFLICT ("userId") DO UPDATE 
        SET "bio" = EXCLUDED."bio",
            "company" = EXCLUDED."company",
            "position" = EXCLUDED."position",
            "updatedAt" = NOW()
      `
    } catch (error) {
      console.error("Error creating profile:", error)
    }

    // Create some analytics data
    try {
      await prisma.$queryRaw`
        INSERT INTO "Analytics" ("id", "userId", "type", "data", "createdAt", "updatedAt")
        VALUES (
          gen_random_uuid(), 
          ${user.id}, 
          'model_usage', 
          '{"model": "vision-v1", "requests": 120, "accuracy": 0.92, "timestamp": "${new Date().toISOString()}"}'::jsonb, 
          NOW(), 
          NOW()
        )
      `
      
      await prisma.$queryRaw`
        INSERT INTO "Analytics" ("id", "userId", "type", "data", "createdAt", "updatedAt")
        VALUES (
          gen_random_uuid(), 
          ${user.id}, 
          'api_usage', 
          '{"endpoint": "/api/vision/detect", "requests": 85, "timestamp": "${new Date().toISOString()}"}'::jsonb, 
          NOW(), 
          NOW()
        )
      `
    } catch (error) {
      console.error("Error creating analytics:", error)
    }

    // Create a prediction
    try {
      await prisma.$queryRaw`
        INSERT INTO "Prediction" (
          "id", 
          "userId", 
          "model", 
          "input", 
          "output", 
          "confidence", 
          "createdAt", 
          "updatedAt"
        )
        VALUES (
          gen_random_uuid(), 
          ${user.id}, 
          'sentiment-analysis-v2', 
          '{"text": "I love this product, it\'s amazing!"}'::jsonb, 
          '{"sentiment": "positive", "score": 0.95, "entities": ["product"]}'::jsonb, 
          0.95, 
          NOW(), 
          NOW()
        )
      `
    } catch (error) {
      console.error("Error creating prediction:", error)
    }

    console.log("Database has been seeded.")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 