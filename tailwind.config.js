/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@radix-ui/react-dialog/dist/**/*.{js,ts,jsx,tsx}", // Add Radix Dialog path to content
];

export const theme = {
  extend: {
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      "fade-out": {
        "0%": { opacity: 1 },
        "100%": { opacity: 0 },
      },
      "zoom-in": {
        "0%": { transform: "scale(0.95)" },
        "100%": { transform: "scale(1)" },
      },
      "zoom-out": {
        "0%": { transform: "scale(1)" },
        "100%": { transform: "scale(0.95)" },
      },
      "slide-in-from-left": {
        "0%": { transform: "translateX(-50%)" },
        "100%": { transform: "translateX(0)" },
      },
      "slide-in-from-top": {
        "0%": { transform: "translateY(-48%)" },
        "100%": { transform: "translateY(0)" },
      },
      "slide-out-to-left": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
      "slide-out-to-top": {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(-48%)" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "fade-in": "fade-in 0.3s ease-out",
      "fade-out": "fade-out 0.3s ease-out",
      "zoom-in": "zoom-in 0.3s ease-out",
      "zoom-out": "zoom-out 0.3s ease-out",
      "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
      "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
      "slide-out-to-left": "slide-out-to-left 0.3s ease-out",
      "slide-out-to-top": "slide-out-to-top 0.3s ease-out",
    },
  },
};

export const plugins = [];
