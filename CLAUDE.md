# CLAUDE.md - Aide-mémoire for Children's Book Generator

## Build Commands

- Development: `bun dev`
- Production: `bun build`
- Start server: `bun start`
- Lint: `bun lint`
- Biome format: `bun format`
- Biome check (lint + format): `bun check`

## Tech Stack

- Next.js 15.2.2 (App Router, with Turbopack in dev)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Clerk (authentication)
- OpenAI and Anthropic (AI-SDK)
- Drizzle ORM with PostgreSQL
- Neon database adapter
- Zod (validation)
 - TanStack Form with Zod adapter
 - TanStack Query
- Biome (linting and formatting)
- Bun as the package manager

## Code Style Guidelines

- **Imports**: Group by: 1) external libs 2) project imports 3) CSS
- **Formatting**: Tab indentation, semicolons, single quotes in JSX
- **Types**: Use strict TS, import types with `import type`, use Zod for validation
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Components**: Prefer functional components with explicit return types
- **Error Handling**: Use Zod for validation, descriptive error messages
- **CSS**: Use Tailwind utility classes with kebab-case for custom classes
