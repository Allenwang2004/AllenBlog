const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Design system: "Verdigris & Drafting Paper"
 *
 * The ground is cool drafting paper, the ink is a petrol-tinted carbon, and the
 * one signal colour is verdigris — oxidised copper, the colour instrument
 * housings go. Brass is reserved for a single state: something that is live.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css,scss}'],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Archivo', ...defaultTheme.fontFamily.sans],
        serif: ['"Source Serif 4"', ...defaultTheme.fontFamily.serif],
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Page grounds
        paper: '#ECEEE9',
        surface: '#F7F8F4',

        // Petrol-tinted slate: replaces Tailwind's neutral everywhere at once.
        gray: {
          50: '#F4F6F4',
          100: '#E6EAE8',
          200: '#D1D8D6',
          300: '#B1BBB9',
          400: '#8C9795',
          500: '#6D7978',
          600: '#4C5857',
          700: '#333E3D',
          800: '#1B2625',
          900: '#101A19',
          950: '#080F0E',
        },

        // Verdigris — the single signal colour.
        primary: {
          50: '#EDF6F3',
          100: '#D3E9E2',
          200: '#A8D3C6',
          300: '#75B9A7',
          400: '#4B9E88',
          500: '#2F8570',
          600: '#1F6F5C',
          700: '#185848',
          800: '#144639',
          900: '#11382E',
          950: '#0A2019',
        },

        // Brass — used only to mark something that is currently live.
        brass: {
          100: '#F2E7CE',
          300: '#D9B970',
          500: '#A9782B',
          600: '#8A6020',
          900: '#3B2A0E',
        },
      },
      letterSpacing: {
        display: '-0.035em',
      },
      maxWidth: {
        measure: '68ch',
      },
      boxShadow: {
        // A single, low, colour-matched lift. No generic rgba(0,0,0,.1) drop.
        lift: '0 1px 2px rgba(16, 26, 25, 0.04), 0 8px 24px -12px rgba(16, 26, 25, 0.18)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
