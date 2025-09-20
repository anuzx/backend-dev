const express = require("express");
const{handleGetAllUsers ,handleUpdateUserId, handleGetUserId,handleDeleteUserId, handleCreateNewUser} = require("../controllers/user");
const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);


router
.route("/:id")
.get(handleGetUserId)
.patch(handleUpdateUserId)
.delete(handleDeleteUserId);

router.post("/" , handleCreateNewUser);
  

module.exports = router;