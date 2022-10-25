const User = require("../models/User.model");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const { clearRes, createJWT } = require("../utils/utils");

exports.signupProcess = (req, res, next) => {
  const { role, email, password, confirmPassword, ...restUser } = req.body;

  const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regexPassword.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Tu contraseña debe contener al menos 8 caracteres, 1 minúscula, 1 mayúscula y 1 número.",
      });
  }

  if (!email.length || !password.length || !confirmPassword.length)
    return res
      .status(400)
      .json({ errorMessage: "No debes mandar campos vacíos." });

  if (password != confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "La contraseña no son iguales!" });
  }

  User.findOne({ email })
    .then((found) => {
      if (found)
        return res
          .status(400)
          .json({ errorMessage: "este correo ya fue tomado" });

      return bcryptjs
        .genSalt(10)
        .then((salt) => bcryptjs.hash(password, salt))
        .then((hashedPassword) => {
          return User.create({ email, password: hashedPassword, ...restUser });
        })

        .then((user) => {
          const [header, payload, signature] = createJWT(user);

          res.cookie("headload", `${header}.${payload}`, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: "strict",
            secure: false,
          });

          res.cookie("signature", signature, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: "strict",
            secure: false,
          });

          const newUser = clearRes(user.toObject());
          res.status(200).json({ user: newUser });
        });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "El correo electronico ya esta en uso.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.loginProcess = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.length || !password.length)
    return res
      .status(401)
      .json({ errorMessage: "no puedes mandar campos vacíos" });

  const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regexPassword.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Tu contraseña debe contener al menos 8 caracteres, 1 minúscula, 1 mayúscula y 1 número.",
      });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ errorMessage: "Credenciales invalidas!" });
      //ver si la contraseña es correcta:
      return bcryptjs.compare(password, user.password).then((match) => {
        if (!match)
          return res
            .status(401)
            .json({ errorMessage: "Credenciales invalidas!" });

        const [header, payload, signature] = createJWT(user);

        res.cookie("headload", `${header}.${payload}`, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });

        res.cookie("signature", signature, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });

        const newUser = clearRes(user.toObject());
        res.status(200).json({ user: newUser });
      });
    })

    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "El correo electronico ya esta en uso.",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
};

exports.logoutProcess = (req, res, next) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res.status(200).json({ successMessage: "Has cerrado sesión." });
};
