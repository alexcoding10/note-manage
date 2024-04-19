import { validateUserIdAndGetUser } from "../services/user.services.js";

import { Note } from "../models/note.js";
import { NoteHistory } from "../models/NoteHistory.js";
import { where } from "sequelize";


export const createNoteForUserHandler = async (req, res) => {
  try {
    const user = await validateUserIdAndGetUser(req, res);

    // Obtener el contenido de la nota del cuerpo de la solicitud
    const { title, content } = req.body;

    // Crear la nota
    const note = await Note.create({
      title: title,
      content: content,
    });

    // Asociar la nota al usuario en la tabla UserNote
    await user.addNote(note);

    res.status(201).json({
      status: "201",
      message: "Note created and associated with user successfully",
      data: {
        note: note,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getAllNotesForUserHandler = async (req, res) => {
  try {
    const user = await validateUserIdAndGetUser(req, res);
    const notes = await user.getNotes({where: {status: 'active'}});
    res.status(200).json({
      status: "200",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal Server Error",
    });
  }
};

export const getNoteByIdHandler = async (req, res) => {
    try {
      const user = await validateUserIdAndGetUser(req, res);
      const noteId = req.params.noteId;
  
      // Obtener todas las notas asociadas al usuario
      const notes = await user.getNotes({ where: { status: 'active', id: noteId } });
  
      if (notes.length === 0) {
        return res.status(404).json({
          status: "404",
          message: "Note not found",
        });
      }
  
      // Devolver la primera nota de la lista (debería ser solo una)
      res.status(200).json({
        status: "200",
        data: notes[0], // Cambiado de note a notes
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "500",
        message: "Internal Server Error",
      });
    }
  };
  
export const updateNoteHandler = async (req, res) => {
    try {
        const user = await validateUserIdAndGetUser(req, res);
        const noteId = req.params.noteId;

        // Obtener la nota por su ID asociada al usuario
        const notes = await user.getNotes({ where: { id: noteId } });

        // Verificar si la nota existe
        if (notes.length === 0) {
            return res.status(404).json({
                status: "404",
                message: "Note not found",
            });
        }

        // Obtener la primera nota de la lista (debería ser solo una)
        const note = notes[0];

        // Crear una entrada en NoteHistory con los datos de la nota original
        await NoteHistory.create({
            title: note.title,
            content: note.content,
            status: 'inactive',
            userId: note.userId, // Si es necesario, ajusta según tu modelo
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        });

        // Crear una copia de la nota con los datos actualizados
        const updatedNote = {
            title: req.body.title || note.title,
            content: req.body.content || note.content,
            status: req.body.status || note.status,
            userId: note.userId, // Si es necesario, ajusta según tu modelo
            createdAt: note.createdAt,
            updatedAt: Date.now(), // Actualizamos la fecha de actualización
        };

        // Actualizar la nota antigua con los nuevos datos
        await note.update(updatedNote);

        return res.status(200).json({
            status: "200",
            message: "Note updated successfully",
            data: updatedNote,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Internal Server Error",
        });
    }
};

  

export const deleteNoteHandler = async (req, res) => {
    try {
        const user = await validateUserIdAndGetUser(req, res);
        const noteId = req.params.noteId;

        // Obtener la nota por su ID asociada al usuario
        const notes = await user.getNotes({ where: { id: noteId } });

        // Verificar si la nota existe
        if (notes.length === 0) {
            return res.status(404).json({
                status: "404",
                message: "Note not found",
            });
        }

        // Obtener la primera nota de la lista (debería ser solo una)
        const note = notes[0];

        // Crear una copia de la nota con los datos actualizados
        const updatedNote = {
            title: req.body.title || note.title,
            content: req.body.content || note.content,
            status: "deleted",
            userId: note.userId, // Si es necesario, ajusta según tu modelo
            createdAt: note.createdAt,
            updatedAt: Date.now(), // Actualizamos la fecha de actualización
        };

        // Actualizar la nota antigua con los nuevos datos
        await note.update(updatedNote);

        return res.status(200).json({
            status: "200",
            message: "Note updated successfully",
            data: updatedNote,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "500",
            message: "Internal Server Error",
        });
    }
};
