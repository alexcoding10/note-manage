import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler
} from "../controllers/user.controller.js";


const routerUser = Router();

routerUser.post("/user", createUserHandler);

routerUser.get("/users", getAllUsersHandler);

routerUser.get("/user/:id", getUserByIdHandler);

export default routerUser;
