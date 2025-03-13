import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';
loadEnvConfig(process.cwd());

console.log(process.env.DATABASE_URL);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    url: process.env.DATABASE_URL!,
  },
});
