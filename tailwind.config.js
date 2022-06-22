module.exports = {
    content: [
        "./public/login.html",
        "./public/signup.html",
        "./public/user.html",
        "./views/layouts/main.handlebars",
        "./views/user.handlebars",
    ],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                "home-img": "url('../../../img/homepage.jpg')",
            }),
            fontFamily: {
                monster: ["'Montserrat'", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};