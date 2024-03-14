const express = require("express");
const router = express.Router();
const {
    get,
    singleGet,
    remove,
    update
} = require("../controllers/question");

router.route("/").get(get);
router.route("/:id").put(update).delete(remove).get(singleGet);

module.exports = router;