'use client';

import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export function AuthStatus() {
  return (
    <>
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
    </>
  );
}
