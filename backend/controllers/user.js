const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");

exports.signup = async (req, res) => {
   try {
      let hash = await bcrypt.hash(req.body.password, 10);
      let user = new User({
         pseudo: req.body.pseudo,
         email: req.body.email,
         password: hash,
      });
      await user.save();
      return res.status(201).json({ message: "User Created!" });
   } catch (e) {
      console.error(e);
      if (e.errors && e.errors.email && e.errors.email.kind === "unique") {
         return res.status(400).json({ errorEmail: "Existing email" });
      }
      if (e.errors && e.errors.pseudo && e.errors.pseudo.kind === "unique") {
         return res.status(400).json({ errorPseudo: "Existing pseudo" });
      }
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.login = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         return res.status(404).json({ message: "User not find!" });
      }
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
         return res.status(401).json({ message: "Incorrect password!" });
      }
      return res.status(200).json({
         userId: user._id,
         token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
         }),
      });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};

exports.getOneUser = async (req, res) => {
   try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         return res.status(400).json({ message: "Invalid user ID" });
      }
      let user = await User.findOne({ _id: req.params.id });
      if (!user) {
         return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(user);
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal error" });
   }
};
