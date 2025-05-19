import { db } from "../server/db";

// This script will push the schema to the database directly
// It's used for development and quick schema updates
async function main() {
  console.log("Pushing schema to database...");
  
  try {
    // Push the schema to the database
    await db.execute(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "file_metadata" (
        "id" TEXT PRIMARY KEY,
        "filename" TEXT NOT NULL,
        "size" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "uploaded_at" TEXT NOT NULL
      );
    `);
    
    console.log("Schema pushed successfully!");
  } catch (error) {
    console.error("Failed to push schema:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();