const mongoose = require("mongoose");

const lobbySchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   maxPlayers: {
      type: Number,
      default: 4,
   },
   players: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   gameStarted: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Lobby", lobbySchema);
