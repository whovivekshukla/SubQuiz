const express = require("express");
const router = express.Router();

const {
  allQuizzes,
  createQuiz,
  showQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(allQuizzes);
router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createQuiz);
router
  .route("/:quizId")
  .get(authenticateUser, authorizePermissions("admin"), showQuiz);
router
  .route("/:quizId")
  .patch(authenticateUser, authorizePermissions("admin"), updateQuiz);
router
  .route("/:quizId")
  .delete(authenticateUser, authorizePermissions("admin"), deleteQuiz);

module.exports = router;
