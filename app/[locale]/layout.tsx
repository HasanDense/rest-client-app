import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';

import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  description: 'The REST client for using and building APIs',
  title: 'RestCafé',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return <>{children}</>;
}
