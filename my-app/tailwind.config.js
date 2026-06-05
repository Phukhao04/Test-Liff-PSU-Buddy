export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    /* ─── Override breakpoints ให้เหมาะกับ mobile-first LIFF ─── */
    screens: {
      // sm = จุดที่ desktop dev เริ่มแสดงกรอบโทรศัพท์ใน Layout
      sm: '480px',
    },

    extend: {
      /* ─── Font ─────────────────────────────────────────────── */
      fontFamily: {
        sans: ['Geist Variable', 'Noto Sans Thai', 'sans-serif'],
      },

      /* ─── Font size scale สำหรับ mobile (base 16px) ────────── */
      // ใช้คู่กับ utility class ใน index.css
      // ตัวเลข px → rem เทียบ base 16px
      fontSize: {
        'xs':   ['11px', { lineHeight: '1.4' }],  // micro / caption เล็ก
        'sm':   ['12px', { lineHeight: '1.5' }],  // caption
        'base': ['14px', { lineHeight: '1.6' }],  // body — ลด 16→14 บน mobile
        'md':   ['15px', { lineHeight: '1.5' }],  // subheading
        'lg':   ['18px', { lineHeight: '1.4' }],  // heading
        'xl':   ['22px', { lineHeight: '1.3' }],  // display / page title
        '2xl':  ['26px', { lineHeight: '1.2' }],
      },

      /* ─── Spacing เพิ่มเติม ─────────────────────────────────── */
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)', // รองรับ notch/home-bar iOS
      },

      /* ─── Border radius ─────────────────────────────────────── */
      borderRadius: {
        'card': '20px',
        'pill': '999px',
      },

      /* ─── Colors (เดิม) ─────────────────────────────────────── */
      colors: {
        'psu-deep-blue': {
          100: '#d1d9e3',
          200: '#a2b5c6',
          300: '#748fa9',
          400: '#456a8d',
          500: '#003c71',
        },
        'psu-sky-blue': {
          100: '#d6eef9',
          200: '#adddf2',
          300: '#83cdeb',
          400: '#5abce5',
          500: '#009cde',
        },
        'psu-ocean-blue': {
          100: '#d9e3f1',
          200: '#b2c7e1',
          300: '#8dabd3',
          400: '#668fc4',
          500: '#3a5dae',
        },
        'psu-andaman-blue': {
          100: '#d1ebf1',
          200: '#a2d7e3',
          300: '#74c2d5',
          400: '#46aec8',
          500: '#0085ad',
        },
        'psu-river-blue': {
          100: '#ddf3f9',
          200: '#bbe8f2',
          300: '#98dceb',
          400: '#76d1e5',
          500: '#54c5de',
        },
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
};