const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const { 
        addNewComment,updateComment,deleteComment,
        addReply,updateReply,deleteReply,
        getComment} = require("../controllers/comment.controllers");

//Add new comment (profil's id)
router.post("/:id", isAuth, addNewComment);

//Update a comment (id comment)
router.put("/:id", isAuth,updateComment);

//delete comment
router.delete("/:id", isAuth, deleteComment);
// *************Replay***************
//Add a reply (id du commentaire mère)
router.post("/reply/:id", isAuth, addReply);

//Update a reply ( id of the reply)
router.put("/reply/:id", isAuth, updateReply);

//Delete a reply (id reply)
router.delete("/reply/:id", isAuth, deleteReply);

//Get a comment (id du profil)
router.get("/:id",getComment);

module.exports = router;