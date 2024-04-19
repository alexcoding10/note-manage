import { User } from "../models/User.js";

export const exitAnotherUserEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        
        return !!user; // Devuelve true si el usuario existe, de lo contrario false
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const checkReqBodyUser =(req,res,next) => {
    try{
        const { username, email, password } = req.body;
        if (!username ||!email ||!password) {
            return res.status(400).json({
                status: "error",
                message: "Username, email and password are required",
            });
        }

        next(); // llama a la siguiente funcion
        
    }catch(error){
        console.log(error)
        throw error
    }
}

export const validateUserIdAndGetUser = async (req, res) => {
    try {
      // Validar si el ID del usuario es válido
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({
          status: "400",
          message: "Invalid user ID",
        });
      }
  
      // Buscar el usuario en la base de datos por ID
      const user = await User.findByPk(userId);
  
      // Si el usuario no existe, devolver un error 404
      if (!user) {
        return res.status(404).json({
          status: "404",
          message: "User not found",
        });
      }
  
      // Si el usuario existe, devolver el usuario
      return user;
    } catch (error) {
      // Manejar cualquier error que ocurra durante la búsqueda
      console.log(error);
      throw new Error('Error al validar el ID del usuario y obtenerlo');
    }
  };