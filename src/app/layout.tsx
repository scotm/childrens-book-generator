import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Story Sprout - Personalized Children's Books",
  description: 'Create custom stories for your children featuring their names, pictures, and pets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                  <Link href="/" className="font-bold text-2xl text-primary">
                    Story Sprout
                  </Link>
                  <nav className="flex items-center gap-4">
                    <SignedIn>
                      <Link href="/dashboard" className="text-sm font-medium hover:underline">
                        My Stories
                      </Link>
                      <Link href="/create" className="text-sm font-medium hover:underline">
                        Create Story
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button type="button" className="text-sm font-medium hover:underline">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button
                          type="button"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                  </nav>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  <p>© 2025 Story Sprout. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
