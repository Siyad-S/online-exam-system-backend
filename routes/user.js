const express = require("express");
const router = express.Router();
const {
    get,
    post,
    singleGet,
    remove,
    update
} = require("");

router.route("/").get(get).post(post);
router.route("/:id").put(update).delete(remove).get(singleGet);

module.exports = router;