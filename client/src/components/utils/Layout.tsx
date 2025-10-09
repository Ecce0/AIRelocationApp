import { ReactNode } from "react";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";

/**
 * Layout: persistent wrapper for all pages
 * Keeps Navbar and Footer fixed across routes.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <Navbar />
      </header>

      {/* Page Content */}
      <main className="flex-grow pt-20 pb-10 container mx-auto px-6">
        <Card className="shadow-sm border border-border/50 rounded-2xl p-6 bg-card">
          {children}
        </Card>
      </main>

      <Separator className="mt-auto opacity-40" />

      {/* Fixed Footer */}
      <footer className="border-t border-border bg-background text-center py-4">
        <Footer />
      </footer>
    </div>
  );
}
