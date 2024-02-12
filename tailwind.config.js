module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '920px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
          },
      extend: {
        colors:{
          teaGreen:"#c7efcf",
          beige:"#eef5db",
          primare:"#3bc0c3",
          secondaire:"#33b0e0",
          tertiare:"#f24f7c",
          quadiare:"#716cb0"
        }
      },
      
    },
    plugins: [require("daisyui")],
  };


  