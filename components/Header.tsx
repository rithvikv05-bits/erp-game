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
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold font-headline">ERP</span>
          </Link>
          {pathname !== "/" && (
            <nav className="flex gap-6 md:flex">
              <Link
                href="/"
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              <Link
                href="/leaderboard"
                className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${pathname === "/leaderboard" ? "text-primary" : "text-muted-foreground"}`}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          {pathname === "/game" && (
            <div className="flex items-center justify-center rounded-md bg-muted px-3 py-1.5 text-sm font-mono text-muted-foreground">
              <TimerIcon className="mr-2 h-4 w-4 text-primary" />
              <Timer />
            </div>
          )}
          {user && pathname !== "/" && (
            <span className="hidden text-sm font-medium sm:block">Welcome, {user.name}!</span>
          )}
        </div>
      </div>
    </header>
  );
}
