"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Home, Timer as TimerIcon } from "lucide-react";
import Timer from "@/components/Timer";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/leaderboard";
import type { User } from "@/lib/types";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold font-headline text-xl">ERP</span>
            </Link>
          </div>

          {/* Center: Navigation - Always visible and centered */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              <Link
                href="/leaderboard"
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/leaderboard" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Link>
            </div>
          </nav>

          {/* Right: Timer and User Info */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {pathname === "/game" && (
              <div className="flex items-center justify-center rounded-md bg-muted px-3 py-1.5 text-sm font-mono text-muted-foreground">
                <TimerIcon className="mr-2 h-4 w-4 text-primary" />
                <Timer />
              </div>
            )}
            {user && pathname !== "/" && (
              <span className="hidden text-sm font-medium sm:block">
                Welcome, {user.name}!
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
