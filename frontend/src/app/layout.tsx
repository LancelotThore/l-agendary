import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next/types';
import RootLayoutClient from '@/components/ui/rootLayoutClient';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | L'agendary",
    default: "L'agendary",
  },
  icons: {
    icon: "/logo.svg",
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="fr">
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
};

export default RootLayout;