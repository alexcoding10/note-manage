import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} from "../controllers/user.controller.js";


const routerUser = Router();

routerUser.post("/user", createUserHandler);

routerUser.get("/users", getAllUsersHandler);

routerUser.get("/user/:id", getUserByIdHandler);

routerUser.put("/user/:id", updateUserHandler);

routerUser.delete("/user/:id", deleteUserHandler);

export default routerUser;
