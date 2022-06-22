const router = require("express").Router();
const { User } = require("../Models");

router.get("/", async(req, res) => {
    try {
        let isdatabase = true;

        const data = await User.findAll({
            // include: [{ model: Bills},{model: Accounts},{model: Debt},{model:Cards}],
        });

        let serializedData = data.map((data) => data.get({ plain: true }));

        res.render("database", { data: serializedData, isdatabase });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;