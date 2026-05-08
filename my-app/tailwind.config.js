export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* PSU Deep Blue (สีน้ำเงินเข้ม) */
        'psu-deep-blue': {
          100: '#d1d9e3',
          200: '#a2b5c6',
          300: '#748fa9',
          400: '#456a8d',
          500: '#003c71',
        },

        /* PSU Sky Blue (สีฟ้า) */
        'psu-sky-blue': {
          100: '#d6eef9',
          200: '#adddf2',
          300: '#83cdeb',
          400: '#5abce5',
          500: '#009cde',
        },

        /* PSU Ocean Blue (สีน้ำเงินทะเล) */
        'psu-ocean-blue': {
          100: '#d9e3f1',
          200: '#b2c7e1',
          300: '#8dabd3',
          400: '#668fc4',
          500: '#3a5dae',
        },

        /* PSU Andaman Blue (สีฟ้าอันดามัน) */
        'psu-andaman-blue': {
          100: '#d1ebf1',
          200: '#a2d7e3',
          300: '#74c2d5',
          400: '#46aec8',
          500: '#0085ad',
        },

        /* PSU River Blue (สีฟ้าแม่น้ำ) */
        'psu-river-blue': {
          100: '#ddf3f9',
          200: '#bbe8f2',
          300: '#98dceb',
          400: '#76d1e5',
          500: '#54c5de',
        },

        /* PSU Sritrang (สีดอกศรีตรัง) */
        'psu-sritrang': {
          100: '#f1f1f8',
          200: '#e4e3f1',
          300: '#d6d4e9',
          400: '#c9c7e2',
          500: '#b6b8dc',
        },
      },
    },
  },
  plugins: [],
}