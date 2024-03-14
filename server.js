const express = require("express");
const app = express();
const port = 4444;
const connectDb = require("./configs/connectionDb");
const cors = require("cors");

connectDb();

app.use(cors());
app.use(express.json());
app.use("/question", require("./routes/question"))
app.use("/user", require("./routes/user"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
