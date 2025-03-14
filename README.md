# Tales Together - Children's Book Generator

Tales Together is a personalized children's book generator that creates custom stories featuring your child, friends and pets. This application allows you to create engaging stories based on your child's name, age, reading level, and other personal details.

## Features

- **User Authentication**: Secure login and account management via Clerk
- **Personalized Stories**: Create custom stories featuring your child's name, age, and personal details
- **Pet Integration**: Include your child's pets in the stories
- **Reading Level Selection**: Choose from beginner (ages 3-5), intermediate (ages 6-8), or advanced (ages 9-12)
- **Story Themes**: Select from various themes like adventure, fantasy, space, and more
- **Story Library**: Save and manage your generated stories
- **Illustration Suggestions**: Provides guidance for where illustrations should be placed
- **Image Upload**: Ability to upload images to include in your stories
- **AI-Powered Story Generation**: Leveraging OpenAI and Anthropic for creative and engaging content

## Technology Stack

- **Framework**: Next.js 15.2.2 (App Router, Turbopack in dev)
- **Frontend**: React 19, TypeScript (strict mode), Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Authentication**: Clerk
- **AI Integration**: OpenAI API and Anthropic (AI-SDK) for story generation
- **Database**: PostgreSQL with Drizzle ORM, Neon database adapter
- **Form Handling**: Tanstack Form with Zod adapter, Tanstack Query
- **Validation**: Zod
- **File Uploads**: UploadThing integration
- **Linting/Formatting**: Biome
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Bun
- Clerk account for authentication
- OpenAI API key for story generation
- Anthropic API key
- PostgreSQL database (Neon recommended)
- UploadThing account for file uploads

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/childrens-book-generator.git
   cd childrens-book-generator
   ```

2. Install dependencies:

   ```bash
   bun install
   # or
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env.local`
   - Add your Clerk, OpenAI, Anthropic, UploadThing, and Database URL keys and secrets

4. Run the development server:

   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
