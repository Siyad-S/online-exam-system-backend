const asyncHandler = require("express-async-handler");
const users = require("../models/user");
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
        email,
      });
      res.status(201).json({ message: "data posted successfully", data });
    }
  } catch (error) {
    console.log(error);
  }
});

//store marks
const storeMark = asyncHandler(async (req, res) => {
  try {
    const { answers } = req.body;
    const id = req.params.id;

    const questionsData = await questions
      .aggregate([
        {
          $match: { _id: { $in: answers.map((answer) => answer.questionId) } },
        },
      ])
      .toArray();
    let mark = 0;
    let corrected = 0;
    let incorrect = 0;
    for (let answer of answers) {
      const question = questionsData.find(
        (question) => question._id === answer.questionId
      );
      if (question) {
        const matchedAnswer = question.answers.find((answer) => answer.correct);
        if (matchedAnswer && matchedAnswer.answer === answer.answer) {
          mark += 5;
          corrected += 1;
          console.log("Correct answer:", answer.answer);
        } else {
          mark > 0 ? (mark -= 1) : (mark = 0);
          incorrect += 1;
          console.log("Incorrect answer:", answer.answer);
        }
      }
    }

    const updatedUser = await userCollection.findByIdAndUpdate(
      id,
      { $push: { marks: { mark, corrected, incorrect } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(201)
      .json({
        message: "marks stored successfully",
        mark,
        corrected,
        incorrect,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = {
  post,
  storeMark,
};
