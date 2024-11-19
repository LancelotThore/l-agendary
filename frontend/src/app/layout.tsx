'use client';

import './globals.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '../components/navBar';
import { Footer } from "../components/ui/footer";
import { Toaster } from "@/components/ui/sonner"

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const pathname = usePathname();
  const noLayoutPages = ['/register', '/login', '/recover/account', '/recover/password'];

  return (
    <html lang="fr">
      <head>
        <title>L'agendary</title>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className='flex flex-col min-h-screen'>
        {noLayoutPages.includes(pathname) ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            
            <main className='container m-auto w-10/12 my-16'>
              {children}
            </main>
            <Toaster />

            <Footer />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;