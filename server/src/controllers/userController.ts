import  User  from "../models/User.js";
import {
  checkRequestUserFields,
  checkNotExistUser,
} from "../services/user.services";

export const createUserHandler = async (req: any, res: any) => {

  checkRequestUserFields(req, res);
  const { username, email, password } = req.body;
  checkNotExistUser(email);
  // Crea el usuario
  const user = await User.create({ username, email, password });
  res.status(200).send(user);
};
