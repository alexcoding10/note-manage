import  User  from "../models/User";

//verifica que se envien todos los campos necesarios
export const checkRequestUserFields = (req: any, res: any) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({ message: "Por favor, rellena todos los campos" });
    return;
  }
};

// Verifica que el usuario no exista
export const checkNotExistUser = async (email: string) => {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return true;
  }
  return false;
};
