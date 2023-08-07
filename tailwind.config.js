const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  //   darkMode: 'class',
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        theme: {
          30: 'rgb(248 249 252)',
          40: 'rgb(244 245 248)',
          50: 'rgb(234 236 241)',
          80: 'rgb(213 217 227)',
          200: 'rgb(147 157 184)',
          300: 'rgb(100 110 135)',
          500: 'rgb(59 66 84)',
          600: 'rgb(47 54 71)',
          700: 'rgb(41 48 64)',
          800: 'rgb(34 40 56)',
        },
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontSize: {
        base: ['15px', '18px'],
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
