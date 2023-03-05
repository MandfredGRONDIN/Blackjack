const Lobby = require("../models/Lobby");

exports.createLobby = async (req, res) => {
   try {
      const { name } = req.body;
      const lobby = new Lobby({
         name,
      });
      await lobby.save();
      return res.status(201).json({ message: "Lobby created", lobby });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

/* exports.deleteLobby = async (req, res) => {
   try {
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
}; */

exports.getAllLobby = async (req, res) => {
   try {
      const lobbies = await Lobby.find();
      return res.status(201).json(lobbies);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getLobby = async (req, res) => {
   try {
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.joinLobby = async (req, res) => {
   try {
      const { lobbyId } = req.params;
      const { userId } = req.body;
      const lobby = await Lobby.findById(lobbyId);
      if (!lobby) {
         return res.status(404).json({ message: "Lobby not found" });
      }
      if (lobby.players.length >= lobby.maxPlayers) {
         return res.status(400).json({ message: "Lobby full" });
      }
      lobby.players.push(userId);
      await lobby.save();
      return res.status(200).json({ message: "Lobby joined", lobby });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.leaveLobby = async (req, res) => {
   try {
      const { lobbyId } = req.params;
      const { userId } = req.body;
      const lobby = await Lobby.findById(lobbyId);
      if (!lobby) {
         return res.status(404).json({ message: "Lobby not found" });
      }
      lobby.players = lobby.players.filter((player) => player != userId);
      await lobby.save();
      return res.status(201).json({ message: "Lobby leave", lobby });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};
