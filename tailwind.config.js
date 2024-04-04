/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary_bg: "#F7F6FC",
      white: "#fff",
      "#161688": "#161688",
      "#5646ff": "#5646ff",
      login_bg: "rgba(255, 254, 252, 0.79)",
      "text-color": "#535CE5",
      "text-color-2": "#888888",
      transparent: "#ffffff00",
    },
    lineHeight: {
      "extra-loose": "1",
      12: "3rem",
    },
    spacing: {
      "-0.5rem": "-0.5rem",
      "0.5rem": "0.5rem",
      "0px": "0px",
      "1rem": "1rem",
      "2rem": "2rem",
      "4rem": "4rem",
      "4px": "4px",
      "10px": "10px",
      "15px": "15px",
      "18px": "18px",
      "24px": "24px",
      "50px": "50px",
      "40px": "40px",
      "48px": "48px",
      "80px": "80px",
      "559px": "559px",
      "55%": "55%",
      "70%": "70%",
    },
    fontSize: {
      "13pix": ["13px", "important"],
      "18pix": ["18px", "important"],
      "21pix": ["21px", "important"],
      "32pix": ["32px", "important"],
      "48pix": ["48px", "important"],
    },
    backgroundImage: {
      login_image: "url('@app/assets/images/login_bg.png')",
    },
    backdropFilter: {
      inherit: "inherit",
    },
    content: {
      empty: "",
    },
  },
  plugins: [],
  important: true,
  // corePlugins: {
  //   preflight: false,
  // },
};
