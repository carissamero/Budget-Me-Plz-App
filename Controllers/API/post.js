const router = require("express").Router();
const { User, Accounts } = require("../../Models/index");

const sendEmail = require("../../Utilities/sendemail");

router.post("/login", async(req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }
        console.log(userData);

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });

            return;
        }
        req.session.logged_in = true;
        req.session.user_id = userData.id;
        res.json({ user: userData, message: "You are now logged in!" });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log(req.session);
        });
        // if (userData.accounts === undefined) {
        //     console.log('hit')
        //     let accounts = {
        //         checking: "Checking",
        //         savings: "Savings",
        //         amount: 0
        //     }

        //     const response = await fetch('/api/post/accounts', {
        //         method: 'POST',
        //         body: JSON.stringify(accounts),
        //         headers: { 'Content-Type': 'application/json' },
        //     });

        //     if (response.ok) {
        //         res.json(response)
        //     } else {
        //         alert('User already exists. Please log in or sign up with a different email.')
        //     }
        // }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/signup", async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (!newUser) {
            res.status(400).json({ message: "Failed to sign un" });
            return;
        }
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/request-new", async(req, res) => {
    try {
        const validEmail = await User.findOne({
            where: {
                email: req.body.accountEmail,
            },
        });
        // console.log(validEmail)
        if (!validEmail) {
            res.status(400).json({ message: "Email not found, please try again" });
            return;
        }

        const link = `https://Budget-Me-Plz.herokuapp.com/password-reset?${validEmail.id}`;
        await sendEmail(
            req.body.accountEmail,
            "Your password reset link",
            `Here is your link to reset your password: ${link}`
        );

        res.send("password reset link sent to your email account");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;