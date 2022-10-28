const User = require("../models/User.model");
const mongoose = require("mongoose");

const { clearRes } = require("../utils/utils");

exports.getLoggedUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

//See user history of operations


