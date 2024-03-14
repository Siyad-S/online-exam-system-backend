const mongoose = require("mongoose");
const questionCollection = require("./models/question");

mongoose
  .connect(
    `mongodb+srv://siyad:NIZUEfw9BiGjNLt1@cluster0.kc66zvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Mongo connection opened");
  })
  .catch((err) => {
    console.error(err);
  });

const seedQuestion = [
  {
    question: "Javascript is an _______ language",
    answers: [
      { answer: "Object-Oriented", correct: true },
      { answer: "Object-based", correct: false },
      { answer: "Procedural", correct: false },
      { answer: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript",
    answers: [
      { answer: "var", correct: false },
      { answer: "let", correct: false },
      { answer: "both 1 an 2", correct: true },
      { answer: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answers: [
      { answer: "getElementById()", correct: false },
      { answer: "getElementByClassName()", correct: false },
      { answer: "Both 1 and 2", correct: true },
      { answer: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: [
      { answer: "Thows and error", correct: false },
      { answer: "Ignores the statements", correct: true },
      { answer: "Gives a warning", correct: false },
      { answer: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    answers: [
      { answer: "document.write()", correct: false },
      { answer: "console.log()", correct: false },
      { answer: "window.alert()", correct: false },
      { answer: "All of the above", correct: true },
    ],
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    answers: [
      { answer: "const", correct: true },
      { answer: "var", correct: false },
      { answer: "let", correct: false },
      { answer: "constant", correct: false },
    ],
  },
  {
    question:
      "What keyword is used to check whether a given property is valid or not?",
    answers: [
      { answer: "in", correct: true },
      { answer: "is in", correct: false },
      { answer: "exists", correct: false },
      { answer: "lies", correct: false },
    ],
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: [
      { answer: "stringify()", correct: true },
      { answer: "parse()", correct: false },
      { answer: "convert()", correct: false },
      { answer: "None of the above", correct: false },
    ],
  },
  {
    question: "Which of the following are closures in Javascript?",
    answers: [
      { answer: "variables", correct: false },
      { answer: "Functions", correct: false },
      { answer: "Objects", correct: false },
      { answer: "All of the above", correct: true },
    ],
  },
  {
    question: "Which of the following is not a Javascript framework?",
    answers: [
      { answer: "Node", correct: false },
      { answer: "Vue", correct: false },
      { answer: "React", correct: false },
      { answer: "Cassandra", correct: true },
    ],
  },
];

const seedDb = async () => {
  try {
    await questionCollection.insertMany(seedQuestion);

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDb();
