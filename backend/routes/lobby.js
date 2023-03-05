const express = require("express");
const lobbyCtrl = require("../controllers/lobby");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", auth, lobbyCtrl.createLobby);

//router.delete("/delete/:id", auth, lobbyCtrl.deleteLobby);

router.get("/", lobbyCtrl.getAllLobby);

router.get("/:id", lobbyCtrl.getLobby);

router.patch("/:lobbyId/join", auth, lobbyCtrl.joinLobby);

router.patch("/:lobbyId/leave", auth, lobbyCtrl.leaveLobby);

module.exports = router;
