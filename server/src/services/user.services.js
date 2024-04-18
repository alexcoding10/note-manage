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