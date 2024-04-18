import { Router } from "express";
import {
  createUserHandler,
  getAllUsersHandler,
} from "../controllers/user.controller.js";


const routerUser = Router();

routerUser.post("/user", createUserHandler);

routerUser.get("/users", getAllUsersHandler);

export default routerUser;
