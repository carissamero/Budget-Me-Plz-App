const router = require("express").Router();

const apiRoutes = require("./API/dashboardRoutes");
const homeRoutes = require("./homeRoutes");
const database = require("./database");
const user = require('./API/user-routes');


router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/database", database);
router.use('/user', user);

module.exports = router;
