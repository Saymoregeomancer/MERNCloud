/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        1: "#121212",
        2: "#2E2E2E",
        3: "#2C2C2C",
        4: "#1E1E1E",
        5: "#232323",
        table: "#272727",
        tableSelect: "#363636",
        purpleButton: "#7420CD",
        purpleButtonInactive: "#571F8E",
        purpleText: "#C7A0F1",
        mainText: "#F2F2F2",
        secondText: "#A0A0A0",
        simplePurple: "#AF79E4",
        textIcon:'#C7A0F1',
        iconGreen:'#08BFA6',
        mainerror:'#fe3839',
        mainsuccess:'#57f000',
        mainwarning:'#ffb302',
      },
      boxShadow: {
        buttonRounded: "inset 0px 0px 25px 1px rgba(0,0,0,0.2)",
        defaultShadow: "rgba(0,0,0,0.2) 0px 8px 24px",
        buttonMainInset:'inset 0px 6px 13px -9px rgba(255,255,255,0.8)',
        buttonMainExtract:'0px 2px 6px 0px #181B17',
        textIconsInset:'inset 0px 6px 13px -9px rgba(255,255,255,0.8)',
        textIconExtract:'0px 5px 18px 4px #181B17',
      },
    },
  },
  plugins: [],
};
