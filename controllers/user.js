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

//get
const get = asyncHandler(async (req, res) => {
  try {
    const data = await collection.find();
    res
      .status(201)
      .json({ message: "Data gotten successfully", data });

    if (!data) {
      res.status(404).json({ message: "data doesn't gotten" });
    }
  } catch (error) {
    console.log(error);
  }
});

//single get
const singleGet = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await collection.findById(id);
    res
      .status(201)
      .json({ message: "Single data gotten successfully", data });

    if (!data) {
      res.status(404).json({ message: "single data doesn't gotten" });
    }
  } catch (error) {
    console.log(error);
  }
});

//update
const update = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const data = await collection.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "data updated successfully", data });

    if (!data) {
      res.status(404).json({ message: "data couldn't update" });
    }
  } catch (error) {
    console.log(error);
  }
});

//delete
const remove = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await collection.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "data deleted successfully", data });

    if (!data) {
      res.status(404).json({ message: "data couldn't delete" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
    get,
    post,
    singleGet,
    remove,
    update
};
