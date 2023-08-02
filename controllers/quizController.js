const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const allQuizzes = async (req, res) => {
  const quiz = await Quiz.find();
  res.status(StatusCodes.OK).json({ quiz });
};

const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !description || !questions) {
    throw new CustomError.BadRequestError(
      "Please provide title, description and questions."
    );
  }

  const quiz = await Quiz.create({
    title,
    description,
    questions,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ quiz });
};

const showQuiz = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new CustomError.BadRequestError("Please provide a valid quizId");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz found with id ${quizId}`);
  }
  res.status(StatusCodes.OK).json({ quiz });
};

const updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  if (!quizId) {
    throw new CustomError.BadRequestError("Please provide a valid quizId");
  }

  const { title, description, questions } = req.body;
  if (!title || !description || !questions) {
    throw new CustomError.BadRequestError(
      "Please provide title, description and questions."
    );
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz found with id ${quizId}`);
  }

  quiz.title = title;
  quiz.description = description;
  quiz.questions = questions;
  await quiz.save();

  res.status(StatusCodes.OK).json({ quiz });
};

const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;
  if (!quizId) {
    throw new CustomError.BadRequestError("Please provide a valid quizId");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz found with id ${quizId}`);
  }

  await Quiz.findOneAndDelete({ _id: quizId });
  res.status(StatusCodes.OK).json({ msg: "Quiz Deleted" });
};

module.exports = {
  allQuizzes,
  createQuiz,
  updateQuiz,
  showQuiz,
  deleteQuiz,
};
