/** @type {import('tailwindcss').Config} */
const { pink, yellow } = require('@mui/material/colors');
const { dark } = require('@mui/material/styles/createPalette');
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',
  "./node_modules/flowbite/**/*.js",
  flowbite.content(),
],
  theme: {
    extend: {
      screens:{
        'newsmall':'400px'
      },
      backgroundImage: {
        'ring': "url('/src/assets/hands.jpg')",
        'card1': "url('/src/assets/card_wallpaper.jpg')",
        'dark_card1': "url('/src/assets/dark_card_wallpaper.jpg')",
        
        // gradient
        'pink': 'linear-gradient(to right, #ffdde1, #ee9ca7)',
        'darkpink': 'linear-gradient(to right, #493240, #FF0099)',
        'blue': 'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
        'darkblue' : 'linear-gradient(to right, #4286f4, #373B44)',
        'red':'linear-gradient(to right, #FFFFFF, #EF3B36)',
        'darkred': 'linear-gradient(to right, #BD3F32, #CB356B)',
        'purpleblue': 'linear-gradient(to right, #89fffd, #ef32d9)',
        '6': 'linear-gradient(to right, #333399, #ff00cc)',
        'green': 'linear-gradient(to right, #faffc5, #73f7dc)',
        'darkgreen': 'linear-gradient(to right, #001510, #00bf8f)',
        'yellow': 'linear-gradient(to right, #ffcf4c, #fceabb)',
        'darkyellow': 'linear-gradient(to right, #F37335, #FDC830)',
        '1':'linear-gradient(90deg, hsla(1, 84%, 80%, 1) 0%, hsla(56, 100%, 50%, 1) 100%)',
        '2':'linear-gradient(90deg, hsla(303, 79%, 76%, 1) 0%, hsla(360, 86%, 67%, 1) 100%)',
        '3':'linear-gradient(90deg, hsla(347, 89%, 61%, 1) 0%, hsla(242, 42%, 40%, 1) 100%)',
        '4':'linear-gradient(90deg, hsla(47, 100%, 87%, 1) 0%, hsla(334, 81%, 60%, 1) 50%, hsla(237, 64%, 56%, 1) 100%)',
        '5':'linear-gradient(90deg, hsla(348, 88%, 66%, 1) 0%, hsla(36, 89%, 68%, 1) 100%)',
      },
      
        "colors":{
          "confettiYellow1":"#FCFC5C",
          "confettiYellow2":"#FBFB00",
          "confettiYellow3":"#FFEE00",
          "confettiYellow4":"#FFD900",
          "confettiYellow5":"#FFBF00",
          "confettiGrey1":"#2a2a2a",
          "confettiGrey2":"#3f3f3f",
          "confettiGrey3":"#545454",
          "confettiGrey4":"#6a6a6a",
          "confettiGrey5":"#7f7f7f",

          
          confettiLightColor1: '#ffffff',
          confettiLightColor2: '#ffffff',
          confettiLightColor3: '#ffffff',
          confettiLightColor4: '#ffffff',
          confettiLightColor5: '#ffffff',
          
          
            confettiDarkColor1: '#070d0d',
            confettiDarkColor2: '#070d0d',
            confettiDarkColor3: '#12171a',
            confettiDarkColor4: '#070d0d',
            confettiDarkColor5: '#070d0d',

          "cFont":"#111111",
        }  ,
        "root": {
          "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
          "rounded": {
            "on": "rounded",
            "off": ""
          },
          "bordered": {
            "on": "border",
            "off": ""
          },
          "inner": {
            "base": "mx-auto flex flex-wrap items-center justify-between",
            "fluid": {
              "on": "",
              "off": "container"
            }
          }
        },
        "brand": {
          "base": "flex items-center"
        },
        "collapse": {
          "base": "w-full md:block md:w-auto",
          "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
          "hidden": {
            "on": "hidden",
            "off": ""
          }
        },
        "link": {
          "base": "block py-2 pl-3 pr-4 md:p-0",
          "active": {
            "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
            "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          },
          "disabled": {
            "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
            "off": ""
          }
        },
        "toggle": {
          "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
          "icon": "h-6 w-6 shrink-0"
        }
      
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
