import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yours, Not Theirs — Your Flyer, Not Theirs',
  description:
    'Seven questions. Your design identity. Everything you make with AI looks like you — not like everyone else.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
