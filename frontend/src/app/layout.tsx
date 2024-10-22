'use client';

import './globals.css';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '../components/navBar';
import { Footer } from "../components/ui/footer";

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
      <body>
        {noLayoutPages.includes(pathname) ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            
            <main className='container m-auto w-10/12 my-16'>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;