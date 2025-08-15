import type { ReactNode } from 'react';
import { Link } from '.';

interface PageLayoutProps {
  heading: string;
  children: ReactNode;
}

export const PageLayout = ({ heading, children }: PageLayoutProps) => (
  <div className="max-w-2xl pt-12 md:pt-24">
    <Link
      url="/"
      className="text-sm flex items-center gap-2"
      text="&larr; Back to home"
    />
    <h1 className="text-4xl font-semibold mb-6 mt-6">{heading}</h1>
    {children}
  </div>
);
