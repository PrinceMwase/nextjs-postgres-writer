module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zapf': ['"Zapf Chancery"', 'cursive'], // use the same name as in the @import rule
        'maglite': ['Maglite'], // use the same name as in the @import rule
      },
      colors:{
        'heading-color': '#bea893',
        'button-color' : '#d9c8b4'
      },
    },
  },
  plugins: [],
};

