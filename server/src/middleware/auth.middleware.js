import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {

    try{
        const authHeader = req.headers["authorization"];
        
        //console.log(authHeader);
        if (authHeader == null) return res.status(401).json({ message: "Unauthorized" });

        //verifica el token 
        jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
          if (err) return res.status(403).json({ message: "Invalid token" });;
          req.user = user;
          next();
        });

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    } 

};
