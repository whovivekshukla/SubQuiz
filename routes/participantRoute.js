const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  participate,
  getAllParticipants,
  getSingleParticipant,
  updateParticipation,
  deleteParticipation,
} = require("../controllers/participantController");


router.post("/:quizId", authenticateUser, participate);
router.get("/:quizId", authenticateUser, getAllParticipants);
router.get("/:quizId/:participantId", authenticateUser, getSingleParticipant);
router.patch("/:quizId", authenticateUser, updateParticipation);
router.delete("/:quizId/", authenticateUser, deleteParticipation);

module.exports = router;
