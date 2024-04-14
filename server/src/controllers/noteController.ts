import { Request, Response } from "express";
import {
  getAllNotes,
  getNoteById,
  getNotesForUser,
  savedNoteHistory,
  updatedNote,
} from "../services/noteServices";
import UserModel from "../models/user";
import { User } from "../interfaces/user";
import { Note, NotesFiels } from "../interfaces/note";
import NoteModel from "../models/Note";
import { StatusNote } from "../models/enums";
import NoteHistoryModel from "../models/NoteHistory";

export const getNotesForUserHandler = async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).send('El parámetro "name" es obligatorio');
  }

  try {
    const notes = await getNotesForUser(name as string);
    return res.status(200).send(notes);
  } catch (error) {
    console.error("Error al obtener las notas del usuario:", error);
    return res.status(500).send("Error al obtener las notas del usuario");
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

export const updateNoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, label } = req.body;
  const fieldsNote: NotesFiels = {
    title: title,
    content: content,
    label: label,
  };

  try {
    // Buscar la nota por su ID
    const note: Note | null = await getNoteById(id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    await savedNoteHistory(note, id);
    await updatedNote(note, fieldsNote, id);

    return res.status(200).send("Note updated successfully");
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).send("Internal server error");
  }
};

export const createdNoteHandler = async (req: Request, res: Response) => {
  try {
    // Valida el cuerpo de la solicitud
    const { idUser, noteFields }: { idUser: string; noteFields: NotesFiels } =
      req.body;
    if (!idUser) {
      return res.status(400).send("El id de usuario es obligatorio");
    }
    //TODO: verificación de que exista el usuario

    // Crear la nota
    const newNote = await NoteModel.create({
      userId: idUser,
      ...noteFields,
    });

    // Guardar la nota en la base de datos y esperar a que se complete
    await newNote.save();

    // Buscar todas las notas del usuario recién creadas
    const userNotes = await NoteModel.find({ userId: idUser });

    // Enviar las notas del usuario como respuesta
    res.status(201).json(userNotes);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const deleteNoteHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Buscar la nota por su ID
    const note = await getNoteById(id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Actualizar el estado de la nota a "Deleted"
    await NoteModel.findByIdAndUpdate(id, { status: StatusNote.Deleted });

    return res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).send("Internal server error");
  }
};

export const getNoteHistoryHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notesHistory = await NoteHistoryModel.findById(id);
    if (!notesHistory) {
      return res.status(404).send("Note history not found");
    }
    return res.status(200).send(notesHistory);
  } catch (error) {
    console.error("Error getting note history:", error);
    return res.status(500).send("Internal server error");
  }
};
