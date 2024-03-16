const express = require("express");
const router = express.Router();
const {
    post,
    storeMark,
} = require("../controllers/user");

router.route("/").post(post);
router.route("/:id").put(storeMark)

module.exports = router;