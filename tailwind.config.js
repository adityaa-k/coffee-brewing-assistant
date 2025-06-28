/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#DEC8AF',
        'brand-brown': '#644D3C',
        'brand-tan': '#C7A379',
        'brand-green': '#A7B39B',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      // Add custom typography styles here
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.brand-brown[900]'),
            '--tw-prose-headings': theme('colors.brand-brown'),
            '--tw-prose-lead': theme('colors.brand-brown[700]'),
            '--tw-prose-links': theme('colors.brand-tan'),
            '--tw-prose-bold': theme('colors.brand-brown'),
            '--tw-prose-counters': theme('colors.brand-tan'),
            '--tw-prose-bullets': theme('colors.brand-tan'),
            '--tw-prose-hr': theme('colors.brand-brown[100]'),
            '--tw-prose-quotes': theme('colors.brand-brown'),
            '--tw-prose-quote-borders': theme('colors.brand-tan'),
            '--tw-prose-captions': theme('colors.brand-brown[700]'),
            '--tw-prose-code': theme('colors.brand-brown'),
            '--tw-prose-pre-code': theme('colors.brand-cream'),
            '--tw-prose-pre-bg': theme('colors.brand-brown'),
            '--tw-prose-th-borders': theme('colors.brand-brown[300]'),
            '--tw-prose-td-borders': theme('colors.brand-brown[200]'),
            '--tw-prose-invert-body': theme('colors.brand-cream'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.brand-cream'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
