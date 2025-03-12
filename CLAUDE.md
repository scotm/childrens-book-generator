# CLAUDE.md - Aide-mémoire for Children's Book Generator

## Build Commands

- Development: `bun dev` or `npm run dev`
- Production: `bun build` or `npm run build`
- Start server: `bun start` or `npm run start`
- Lint: `bun lint` or `npm run lint`
- Biome format: `bun format` or `npm run format`
- Biome check (lint + format): `bun check` or `npm run check`

## Tech Stack

- Next.js 15.2.1 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- Clerk (authentication)
- OpenAI
- Drizzle ORM with PostgreSQL
- Neon database adapter
- Zod (validation)
- Tanstack Form with Zod adapter
- Biome (linting and formatting)
- Bun as the package manager, not npm

## Code Style Guidelines

- **Imports**: Group by: 1) external libs 2) project imports 3) CSS
- **Formatting**: Tab indentation, semicolons, single quotes in JSX
- **Types**: Use strict TS, import types with `import type`, use Zod for validation
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Components**: Prefer functional components with explicit return types
- **Error Handling**: Use Zod for validation, descriptive error messages
- **CSS**: Use Tailwind utility classes with kebab-case for custom classes
