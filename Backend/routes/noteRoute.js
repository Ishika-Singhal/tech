const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  createNewNote,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteController");

router
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(UpdateNote)
  .delete(DeleteNote);

module.exports = router;
