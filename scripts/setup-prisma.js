const { execSync } = require("child_process")
const fs = require("fs")

// Check if .env file exists
if (!fs.existsSync(".env")) {
  console.log("Creating .env file...")
  fs.writeFileSync(
    ".env",
    'DATABASE_URL="postgresql://postgres:password@localhost:5432/proofofyou?schema=public"\nNEXTAUTH_SECRET="your-nextauth-secret"\nNEXTAUTH_URL="http://localhost:3000"\n',
  )
}

try {
  // Generate Prisma client
  console.log("Generating Prisma client...")
  execSync("npx prisma generate", { stdio: "inherit" })

  console.log("Prisma setup completed successfully!")
} catch (error) {
  console.error("Error during Prisma setup:", error.message)
  process.exit(1)
}
