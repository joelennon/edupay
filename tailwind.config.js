/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./resources/ts/**/*.tsx", "./resources/views/**/*.blade.php"],
    theme: {
        extend: {
            colors: {
                ...defaultTheme.colors,
                primary: "rgb(var(--primary) / <alpha-value>)",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
    ],
};
