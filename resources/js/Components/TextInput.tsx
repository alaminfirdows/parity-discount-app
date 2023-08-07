import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      'border-theme-80 dark:border-theme-300 bg-transparent focus:border-theme-800 dark:focus:border-gray-900 focus:ring-theme-800 dark:focus:ring-theme-30 rounded',
      props.className,
    )}
  />
));

export default TextInput;
