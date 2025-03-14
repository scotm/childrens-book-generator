import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

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
        <body className={`${inter.variable} ${quicksand.variable} font-sans`}>
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b bg-gradient-to-r from-background to-lavender/5">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                  <Link
                    href="/"
                    className="font-display font-bold text-2xl bg-clip-text  bg-gradient-to-r from-primary to-teal transition-all duration-300 hover:scale-105"
                  >
                    Story Sprout
                  </Link>
                  <nav className="flex items-center gap-6">
                    <SignedIn>
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                      >
                        My Stories
                      </Link>
                      <Link
                        href="/create"
                        className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                      >
                        Create Story
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button
                          type="button"
                          className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button
                          type="button"
                          className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-md hover:shadow-primary/20 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        >
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                  </nav>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-8 bg-gradient-to-r from-lavender/5 to-background">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <Link
                        href="/"
                        className="font-display font-bold text-xl bg-clip-text bg-gradient-to-r from-primary to-teal"
                      >
                        Story Sprout
                      </Link>
                    </div>
                    <div className="flex gap-6">
                      <Link
                        href="/privacy"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Privacy Policy"
                      >
                        Privacy
                      </Link>
                      <Link
                        href="/terms"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Terms of Service"
                      >
                        Terms
                      </Link>
                      <Link
                        href="/help"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Help and FAQ"
                      >
                        Help
                      </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>© 2025 Story Sprout. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
