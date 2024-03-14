const asyncHandler = require("express-async-handler");
const collection = require("../models/user");
const questions = require("../models/question");

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

//store marks 
const storeMark = asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const id = req.params.id;

      const questionsData = questions.find()
      

      const data = await collection.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "marks stored successfully", data });
  
      if (!data) {
        res.status(404).json({ message: "marks couldn't update" });
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = {
    post,
    storeMark
};
