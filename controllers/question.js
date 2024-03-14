const asyncHandler = require("express-async-handler");
const collection = require("../models/question");

//get
const get = asyncHandler(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const startIndex = (page - 1) * pageSize;
      
      const data = await collection.find().skip(startIndex).limit(pageSize);
      
      res.status(200).json({ message: "Data fetched successfully", data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
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
    singleGet,
    remove,
    update
};
