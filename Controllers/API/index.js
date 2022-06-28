const router = require("express").Router();
const userGet = require("./get");
const userPost = require("./post");
const userPut = require("./put");
const dashRoute = require("./dashboardRoutes.js");
// const userDelete = require('./delete');

router.use("/get", userGet);
router.use("/post", userPost);
router.use("/put", userPut);
router.use("/dash", dashRoute);
// router.use('/delete', userDelete)

module.exports = router;