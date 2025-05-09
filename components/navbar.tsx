"use client";

import { QrCode } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <span className="font-semibold text-lg">EventQR</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link
              href="/register"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/register") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Register
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/event-register"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/event-register") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Scan
            </Link>
            <Link
              href="/create-event"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/create-event") && "text-primary"
              )}
            >
              Create Event
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="hidden md:flex">
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;