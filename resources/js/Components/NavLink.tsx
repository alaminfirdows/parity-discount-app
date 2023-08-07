import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  href: string;
  active?: boolean;
}

export default function NavLink({
  active,
  href,
  children,
}: PropsWithChildren<Props>) {
  const classes = `flex items-center space-x-2 mb-1 py-2.5 px-3 hover:bg-theme-40 dark:hover:bg-theme-700 rounded hover:text-theme-800 dark:hover:text-white font-medium ${
    active ? 'text-theme-800 dark:text-white bg-theme-50 dark:bg-theme-800' : ''
  }`;

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
