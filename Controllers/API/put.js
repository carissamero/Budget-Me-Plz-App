const router = require("express").Router();
const { User, Bills } = require("../../Models");

router.put("/reset/:id", async(req, res) => {
    try {
        const newPass = await User.update({
            password: req.body.newPassword,
        }, {
            where: {
                id: req.body.id,
            },
            individualHooks: true,
        });
        if (!newPass) {
            res.status(400).json({ message: "Enter a password, please try again" });
            return;
        }

        res.json(newPass);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/bills", async(req, res) => {
    try {
        const data = await Bills.update({
            debited: req.body.debited,
        }, {
            where: {
                id: req.body.id,
            },
        });
        if (!data) {
            res.status(400).json({ message: "changed income status" });
            return;
        }

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/income", async(req, res) => {
    try {
        const data = await User.update({
            monthly_income: req.body.monthly_income,
        }, {
            where: {
                id: req.session.user_id,
            },
        });
        if (!data) {
            res.status(400).json({ message: "changed income status" });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;