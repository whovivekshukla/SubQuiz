const express = require("express");
const router = express.Router();

const {
  createQuiz,
  showQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const {
  authenticateUser,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createQuiz);
router.route("/:quizId").get(authenticateUser, showQuiz);
router
  .route("/:quizId")
  .patch(authenticateUser, updateQuiz);
router
  .route("/:quizId")
  .delete(authenticateUser, deleteQuiz);

module.exports = router;
