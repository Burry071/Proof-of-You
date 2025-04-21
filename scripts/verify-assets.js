import fs from "fs/promises"

async function verifyAssets() {
  console.log("Verifying asset files in the repository...")

  const requiredAssets = ["public/logo.png", "public/logo.svg", "public/demo-screenshot.png"]

  const missingAssets = []

  for (const asset of requiredAssets) {
    try {
      await fs.access(asset)
      console.log(`✅ ${asset} exists`)
    } catch (error) {
      console.error(`❌ ${asset} is missing`)
      missingAssets.push(asset)
    }
  }

  if (missingAssets.length > 0) {
    console.error("\nMissing assets:")
    missingAssets.forEach((asset) => console.error(`- ${asset}`))
    console.error("\nPlease add these files to the repository.")
  } else {
    console.log("\nAll required assets are present in the repository.")
  }
}

verifyAssets()
