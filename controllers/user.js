const asyncHandler = require("express-async-handler");
const collection = require("../models/user");
//post
const post = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body);
    if (!name || !email) {
      res.status(404).json({ message: "all fields are mandatory" });
    } else {
      const data = await collection.create({
        name,
        email
      });
      res
        .status(201)
        .json({ message: "data posted successfully", data});
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
    post,
};
