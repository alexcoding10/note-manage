import app from "./app.js";
import dotenv from "dotenv";
import routerUser from "./routes/user.route.js";
dotenv.config();

// Logica de routas y conexiones a base de datos
app.use('/',routerUser)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});