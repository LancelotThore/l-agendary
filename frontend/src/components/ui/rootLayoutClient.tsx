'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navBar';
import { Footer } from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import CookiePopup from '@/components/ui/cookiePopup';

interface RootLayoutClientProps {
  children: ReactNode;
}

const RootLayoutClient = ({ children }: RootLayoutClientProps) => {
  const pathname = usePathname();
  const noLayoutPages = ['/register', '/login', '/forgot-password', '/reset-password'];

  return (
    <body className='flex flex-col min-h-screen'>
      {noLayoutPages.includes(pathname) ? (
        <>{children}</>
      ) : (
        <>
          <Navbar />
          <main className='container m-auto w-10/12'>
            <div className='my-16'>
              {children}
            </div>
          </main>
          <CookiePopup />
          <Toaster />
          <Footer />
        </>
      )}
    </body>
  );
};

export default RootLayoutClient;