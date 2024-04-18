import Router from 'express'
import { createUserHandler } from '../controllers/userController';

const routerUser = Router();

//Crear Usuario
routerUser.post('/user', createUserHandler)

export default routerUser;