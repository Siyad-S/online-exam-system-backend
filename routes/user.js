const express = require("express");
const router = express.Router();
const {
    post,

} = require("../controllers/user");

router.route("/").post(post);

module.exports = router;