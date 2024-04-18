import { User } from "../models/User.js";
import {
  exitAnotherUserEmail,
  checkReqBodyUser,
} from "../services/user.services.js";

export const createUserHandler = async (req, res) => {
  try {
    // Comprueba si el cuerpo de la solicitud es válido
    checkReqBodyUser(req, res, async () => {
      // Destructura el cuerpo de la solicitud
      const { username, email, password } = req.body;
      // Verifica si existe un usuario con el email
      if (await exitAnotherUserEmail(email)) {
        return res.status(400).json({
          status: "400",
          message: "User already exists with this email",
        });
      }
      // Si no existe, crea el usuario
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        status: "201",
        data: user,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "200",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    //console.log(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "404",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "200",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};
