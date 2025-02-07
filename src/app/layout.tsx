// src/app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Academic Portal',
  description: 'Welcome to the Academic Portal',
};
// src/app/layout.tsx or src/pages/_app.tsx
import React from 'react';
import { ThemeProvider } from '../ThemeContext';

interface RootLayoutProps {
  children: ReactNode;
}

const MyApp = ({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}