"use client";

import "@/styles/globals.css";
import Navigation from "./components/NavBar";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import SigninButton from "./components/SignInButton";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Removed <html> and added React fragment
    <>
      <html>
        <body>
          <div className={`min-w-[350px] ${inter.className}`}>
            <SessionProvider>
              <Navigation />
              <SigninButton />
              {children}
              <Footer />
            </SessionProvider>
          </div>
        </body>
      </html>
    </>
  );
}
