import { validateUserIdAndGetUser } from "../services/user.services.js";

import { Note } from "../models/note.js";

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
    const notes = await user.getNotes();
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
      const notes = await user.getNotes();
  
      // Buscar la nota por su ID utilizando find
      const note = notes.find(note => note.id === Number(noteId));
  
      if (!note) {
        return res.status(404).json({
          status: "404",
          message: "Note not found",
        });
      }
  
      res.status(200).json({
        status: "200",
        data: note,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "500",
        message: "Internal Server Error",
      });
    }
  };
  

export const updateNoteHandler = async (req, res) => {};

export const deleteNoteHandler = async (req, res) => {};
