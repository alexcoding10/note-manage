import { User } from "../models/User.js";
import {
  exitAnotherUserEmail,
  checkReqBodyUser,
  validateUserIdAndGetUser,
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
    const users = await User.findAll({
      where: {
        status: "active",
      },
    });
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

export const updateUserHandler = async (req, res) => {
  try {
    const user = await validateUserIdAndGetUser(req, res);
    // TODO Validar la solicitud para asegurarse de que los datos sean seguros y aplicarlos al usuario existente
    await user.update(req.body, { updatedAt: new Date() });

    // Devolver una respuesta 200 con el usuario actualizado
    res.status(200).json({
      status: "200",
      data: user,
    });
  } catch (error) {
    // Manejar errores internos del servidor
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    // no se va a borrar de base de datos solo se va a cambiar su estado a deleted
    const user = await validateUserIdAndGetUser(req, res);

    await user.update({
      status: "deleted",
      updatedAt: new Date(),
    });

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
