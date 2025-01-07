const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createNewUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(UpdateUser)
  .delete(DeleteUser);

module.exports = router;
