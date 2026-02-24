import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FDF8F3',
          dark: '#F5EDE4',
        },
        forest: {
          DEFAULT: '#2D5A47',
          light: '#3D7A5F',
          dark: '#1E3D30',
        },
        amber: {
          DEFAULT: '#E8A849',
          light: '#F5C97A',
        },
        coral: {
          DEFAULT: '#E07B6B',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
        mono: ["'Courier New'", 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
