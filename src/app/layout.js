
"use client";
import { Inter } from 'next/font/google'; // Import Inter font
import { Montserrat } from 'next/font/google'; // Import Montserrat font
import "./globals.css"; // Global CSS import
import { UserStore } from "@/context/UserStore";

import { useEffect } from 'react';

// Initialize the fonts correctly
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    document.title = "TaskFlow";
  }, []);

  return (
    <html lang="en">
      <UserStore>
        <body className={`${inter.className} ${montserrat.className} antialiased min-h-full`}>
          {children}
        </body>
      </UserStore>
    </html>
  );
}
