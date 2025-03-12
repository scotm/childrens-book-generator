import { drizzle } from 'drizzle-orm/neon-http';

import { env } from '../env.mjs';

export const db = drizzle(env.DATABASE_URL);
