/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        usf: {
          green: '#006747',
          greenDeep: '#004E36',
          greenSoft: '#E6F2EE',
          gold: '#CFC493',
          goldWarm: '#D4A359',
          goldLight: '#F7F2E4',
          terracotta: '#D96B43',
          terracottaSoft: '#FCEEE9',
          cream: '#FAF7F2',
          sand: '#F2ECE1',
          ink: '#1E2A24',
          muted: '#5A6B62',
        }
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(30, 42, 36, 0.07)',
        'warm-lg': '0 20px 40px -15px rgba(0, 103, 71, 0.12)',
      }
    },
  },
  plugins: [],
}
