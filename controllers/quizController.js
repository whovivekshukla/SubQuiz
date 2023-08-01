const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  // Check for required fields
  if (!title || !description || !questions) {
    throw new CustomError.BadRequestError("Please provide all required data.");
  }

  try {
    // Create a new Quiz instance
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      createdBy: req.user._id, // Assuming you have middleware that adds the authenticated user to 'req.user'
    });

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    res.status(201).json({ quiz: savedQuiz });
  } catch (error) {
    // Handle any errors that occur during the save process
    console.error(error);
    throw new CustomError.InternalServerError(
      "An error occurred while saving the quiz."
    );
  }
};

const showQuiz = async (req, res) => {
  console.log(req.role);
  res.send("Show Quiz");
};

const updateQuiz = async (req, res) => {
  res.send("Update Quiz");
};

const deleteQuiz = async (req, res) => {
  res.send("Delete Quiz");
};

module.exports = {
  createQuiz,
  updateQuiz,
  showQuiz,
  deleteQuiz,
};
