const router = require("express").Router();
const { User, Bills } = require("../../models");

router.get("/:id", async(req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [{ model: Bills }],
    });
    // const userData = await user.get({ plain: true })
    res.json({ User: user });
});

router.get("/bills", async(req, res) => {
    const data = await Bills.findAll();
    res.json({ bills: data });
});

module.exports = router;