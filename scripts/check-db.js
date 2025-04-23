const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  try {
    // Try to connect to the database
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`
    console.log("Database connection successful:", result)

    // Count users
    const userCount = await prisma.user.count()
    console.log(`Database has ${userCount} users`)

    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection failed:", error)
    return { success: false, error: error.message }
  } finally {
    await prisma.$disconnect()
  }
}

main().then(console.log).catch(console.error)
