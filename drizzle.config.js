import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Correct path to schema.js
  schema: "./utils/schema.js", // Adjust the relative path based on your project structure
  dbCredentials: {
    url: "postgresql://AI-Interview-Mocker_owner:ijI0tC2ehMuR@ep-rough-art-a52i5si1.us-east-2.aws.neon.tech/AI-Interview-Mocker?sslmode=require", // Your database URL
  },
});
