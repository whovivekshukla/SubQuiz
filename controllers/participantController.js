const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const participate = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  // checking the answer
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new CustomError.BadRequestError("Please provide valid answers.");
  }

  // Fetch the quiz by ID
  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) {
    throw new CustomError.NotFoundError("Quiz not found.");
  }

  //checking if user have already submitted the answer
  const ifAlreadySubmitted = await Participant.findOne({
    user: req.user.userId,
    quiz: quizId,
  });

  if (ifAlreadySubmitted) {
    throw new CustomError.BadRequestError(
      "You have already participated in this quiz."
    );
  }

  //check if all the answers are provided or not
  if (answers.length !== quiz.questions.length) {
    throw new CustomError.BadRequestError(
      "Please provide answers for all the questions."
    );
  }

  let participantScore = 0;

  for (var i = 0; i < quiz.questions.length; i++) {
    const currentQuestion = quiz.questions[i];
    const selectedOptions = answers[i];

    if (!Array.isArray(selectedOptions)) {
      throw new CustomError.BadRequestError(
        "Invalid format for selected options."
      );
    }

    const correctOptions = currentQuestion.correctOptions.sort();
    const sortedSelectedOptions = selectedOptions.sort();

    if (
      JSON.stringify(sortedSelectedOptions) === JSON.stringify(correctOptions)
    ) {
      participantScore++;
    }
  }

  const participation = await Participant.create({
    user: req.user.userId,
    quiz: quizId,
    answers: answers,
    score: participantScore,
  });

  res.status(StatusCodes.OK).json({ participation });
};

const getAllParticipants = async (req, res) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findOne({ _id: quizId, createdBy: req.user.userId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz Found with ID ${quizId}`);
  }
  const participants = await Participant.findOne({ quiz: quizId }).select(
    "-answers"
  );
  if (!participants) {
    throw new CustomError.NotFoundError(
      "No one has participated yet in this quiz."
    );
  }
  res.status(StatusCodes.OK).json({ participants });
};

const getSingleParticipant = async (req, res) => {
  const { quizId, participantId } = req.params;
  if (!quizId || !participantId) {
    throw new CustomError.BadRequestError(
      "Please provide valid quizId and participantId"
    );
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz found with id ${quizId}`);
  }

  const user = await User.findOne({ _id: participantId });
  if (!user) {
    throw new CustomError.NotFoundError(
      `No User found with id ${participantId}`
    );
  }

  const participant = await Participant.findOne({
    quiz: quizId,
    user: participantId,
  });

  if (!participant) {
    throw new CustomError.NotFoundError(
      `No Participant found with quizId ${quizId} and participantId ${participantId}`
    );
  }

  res.status(StatusCodes.OK).json(participant);
};

const updateParticipation = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  // checking the answer
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new CustomError.BadRequestError("Please provide valid answers.");
  }

  // Fetch the quiz by ID
  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) {
    throw new CustomError.NotFoundError("Quiz not found.");
  }

  //check if all the answers are provided or not
  if (answers.length !== quiz.questions.length) {
    throw new CustomError.BadRequestError(
      "Please provide answers for all the questions."
    );
  }

  let participantScore = 0;

  for (var i = 0; i < quiz.questions.length; i++) {
    const currentQuestion = quiz.questions[i];
    const selectedOptions = answers[i];

    if (!Array.isArray(selectedOptions)) {
      throw new CustomError.BadRequestError(
        "Invalid format for selected options."
      );
    }

    const correctOptions = currentQuestion.correctOptions.sort();
    const sortedSelectedOptions = selectedOptions.sort();

    if (
      JSON.stringify(sortedSelectedOptions) === JSON.stringify(correctOptions)
    ) {
      participantScore++;
    }
  }

  const participation = await Participant.findOne({
    user: req.user.userId,
    quiz: quizId,
  });

  participation.answers = answers;
  participation.score = participantScore;
  await participation.save();

  res.status(StatusCodes.OK).json({ participation });
};

const deleteParticipation = async (req, res) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new CustomError.NotFoundError(`No Quiz with ID ${quizId}`);
  }

  const participation = await Participant.findOne({
    quiz: quizId,
    user: req.user.userId,
  });

  if (!participation) {
    throw new CustomError.BadRequestError(
      "You have not participated in this quiz!"
    );
  }

  await Participant.findOneAndDelete({ quiz: quizId, user: req.user.userId });
  res.status(StatusCodes.OK).json({ msg: "Participation Deleted!" });
};

module.exports = {
  participate,
  getAllParticipants,
  getSingleParticipant,
  updateParticipation,
  deleteParticipation,
};
