'use client';

import './globals.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from "../components/ui/navbar";
import { Footer } from "../components/ui/footer";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();
  const noLayoutPages = ['/register'];

  return (
    <html lang="fr">
      <head>
        <title>Mon App Next.js</title>
      </head>
      <body>
        {noLayoutPages.includes(pathname) ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            
            <main>{children}</main>
            
            <Footer />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;