
const mongoose = require("mongoose");
const User = require("../models/User.model");


exports.getUsers = (req, res, next) => {
    User.find() 
      .then((user) => {
          res.status(200).json({ user });
      })
  
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  };
  