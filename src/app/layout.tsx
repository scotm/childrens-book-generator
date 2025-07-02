import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthStatus } from '@/components/auth/AuthStatus';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Tales Together - Personalized Children's Books",
  description: 'Create custom stories for your children featuring their names, pictures, and pets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${quicksand.variable} font-sans`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-gradient-to-r from-background to-lavender/5">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                  href="/"
                  className="font-display font-bold text-2xl bg-clip-text  bg-gradient-to-r from-primary to-teal transition-all duration-300 hover:scale-105"
                >
                  Tales Together
                </Link>
                <nav className="flex items-center gap-6">
                  <AuthStatus />
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
                      Tales Together
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
                    <p>© 2025 Tales Together. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
