const asyncHandler = require("express-async-handler");
const userCollection = require("../models/user");
const questions = require("../models/question");
const { log } = require("console");

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
    console.log(answers);
    const id = req.params.id;

    //   const answersData = Object.values(answers);
    //   console.log(answersData);
    const questionsData = await questions.find();
    let mark = 0;
    let corrected = 0;
    let incorrect = 0;
    answers.map((answer) => {
      questionsData.map((question) => {
        if (answer.questionId === question._id) {
          const checkedAnswer = question?.answers?.filter(
            (checkAnswer) => checkAnswer.correct === true
          );
          console.log("checkedAnswer:*******************", checkedAnswer);
          // if (answer === checkedAnswer) {
          //     mark = mark + 5;
          //     corrected ++;
          //     console.log("Correct answer:", answer.answer);
          // } else {
          //     mark > 0 ? (mark = mark - 1) : (mark = 0);
          //     incorrect ++;
          //     console.log("Incorrect answer:", answer.answer);
          // }
        }
      });
    });

    console.log("questionsData", questionsData);

    const updatedUser = await userCollection.findByIdAndUpdate(
      id,
      { marks: { mark, corrected, incorrect } },
      { new: true }
    );
    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "Marks stored successfully",
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
