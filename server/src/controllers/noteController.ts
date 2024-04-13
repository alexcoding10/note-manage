import { Request, Response } from 'express';
import { getAllNotes, getNotesForUser } from '../services/noteServices';
import UserModel from '../models/user';
import { User } from '../interfaces/user';
import { Note } from '../interfaces/note';



export const getNotesForUserHandler = async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).send('El parámetro "name" es obligatorio');
    }

    try {
        const notes = await getNotesForUser(name as string);
        return res.status(200).send(notes);
    } catch (error) {
        console.error('Error al obtener las notas del usuario:', error);
        return res.status(500).send('Error al obtener las notas del usuario');
    }
};


// Controlador para manejar la solicitud de obtener todas las notas de los usuarios
export const getAllNotesHandler = async (req: Request, res: Response) => {
    try {
      // Buscar todos los usuarios en la base de datos
      // con await no pasará a la siguiente instruccion hasta que no haya terminado
      const users: User[] = await UserModel.find();
  
      // Obtener todas las notas de todos los usuarios
      // con await no pasará a la siguiente instruccion hasta que no haya terminado
      const notes: Note[] = await getAllNotes(users);
  
      // Enviar las notas al cliente como respuesta HTTP con un código de estado 200 (OK)
      res.status(200).send(notes);
    } catch (error) {
      // Manejar cualquier error que ocurra durante la ejecución del código
      console.error("Error al obtener las notas:", error);
      res.status(500).send("Error al obtener las notas");
    }
  };
  