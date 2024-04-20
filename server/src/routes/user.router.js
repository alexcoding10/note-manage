import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} from "../controllers/user.controller.js";
import {checkToken} from "../middleware/auth.middleware.js";



const routerUser = Router();

routerUser.post("/user", createUserHandler);

routerUser.get("/users",getAllUsersHandler);

routerUser.get("/user",checkToken, getUserByIdHandler);

routerUser.put("/user/:id",checkToken, updateUserHandler);

routerUser.delete("/user/:id",checkToken, deleteUserHandler);


export default routerUser;
