import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  as?: string;
  href?: string;
}

export default function DropdownLink({
  as,
  href,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return (
              <button
                type="submit"
                className="w-full text-left block my-1 px-4 py-2 rounded hover:text-theme-800 hover:dark:text-white hover:bg-theme-40 dark:hover:bg-theme-500 stroke-theme-300 dark:stroke-theme-200 hover:stroke-theme-800 dark:hover:stroke-white transition mx-1"
              >
                {children}
              </button>
            );
          case 'a':
            return (
              <a
                href={href}
                className="block my-1 px-4 py-2 rounded hover:text-theme-800 hover:dark:text-white hover:bg-theme-40 dark:hover:bg-theme-500 stroke-theme-300 dark:stroke-theme-200 hover:stroke-theme-800 dark:hover:stroke-white transition mx-1"
              >
                {children}
              </a>
            );
          default:
            return (
              <Link
                href={href || ''}
                className="block my-1 px-4 py-2 rounded hover:text-theme-800 hover:dark:text-white hover:bg-theme-40 dark:hover:bg-theme-500 stroke-theme-300 dark:stroke-theme-200 hover:stroke-theme-800 dark:hover:stroke-white transition mx-1"
              >
                {children}
              </Link>
            );
        }
      })()}
    </div>
  );
}
