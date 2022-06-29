const router = require("express").Router();

const apiRoutes = require("./API/dashboardRoutes");
const homeRoutes = require("./homeRoutes");
const database = require("./database");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/database", database);

module.exports = router;