/** Brand tokens — single source of truth is docs/02-design-language.md */
export default {
  content: ['./*.html', './src/**/*.html', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#16341D',
          700: '#1E4A28',
          600: '#2C5A32',
        },
        leaf: {
          500: '#4E7A3A',
        },
        sage: {
          400: '#93A758',
          200: '#D6DFC0',
        },
        wheat: {
          500: '#C9A24B',
        },
        sun: {
          400: '#D9A441',
        },
        cream: {
          50: '#FAF8F0',
          100: '#F3F0E4',
        },
        ink: {
          900: '#232A20',
          600: '#5A6354',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};
