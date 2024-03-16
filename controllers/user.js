const asyncHandler = require("express-async-handler");
const userCollection = require("../models/user");
const questions = require("../models/question");

// Post
const post = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body);
    if (!name || !email) {
      res.status(404).json({ message: "all fields are mandatory" });
    } else {
      const data = await userCollection.create({
        name,
        email,
      });
      res.status(201).json({ message: "data posted successfully", data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Store marks
const storeMark = asyncHandler(async (req, res) => {
  try {
    const { answers } = req.body;
    const id = req.params.id;

    const questionsData = await questions.find();

    let mark = 0;
    let corrected = 0;
    let incorrect = 0;

    for (const answer of answers) {
      const question = questionsData.find(
        (q) => q._id.toString() === answer.questionId
      );

      if (question) {
        const submittedAnswer = question.answers.find(
          (a) => a.answer === answer.answer
        );

        if (submittedAnswer && submittedAnswer.correct) {
          mark += 5;
          corrected++;
        } else {
          mark = Math.max(0, mark - 1);
          incorrect++;
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

    res.cookie("mark", mark);
    res.cookie("corrected", corrected);
    res.cookie("incorrect", incorrect);

    res.status(201).json({
      message: "Marks stored successfully",
      mark,
      corrected,
      incorrect
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
