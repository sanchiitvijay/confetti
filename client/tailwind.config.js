/** @type {import('tailwindcss').Config} */
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
        'confess': "url('/src/assets/confess.jpg')",
        'propose': "url('/src/assets/propose.jpg')",
        'propose1': "url('/src/assets/propose1.jpg')",
        'ring': "url('/src/assets/hands.jpg')"
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

          
            confettiColor1: '#fff4ce',
            confettiColor2: '#ffeeb6',
            confettiColor3: '#ffe89d',
            confettiColor4: '#ffe385',
            confettiColor5: '#ffdd6c',
          
          
            confettiColor1: '#49332b',
            confettiColor2: '#3d2b24',
            confettiColor3: '#30221d',
            confettiColor4: '#241a16',
            confettiColor5: '#18110e',
          

          
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
