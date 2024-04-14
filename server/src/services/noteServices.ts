import { Note, NoteHistory, NotesFiels } from "../interfaces/note";
import { User } from "../interfaces/user";
import NoteModel from "../models/Note";
import NoteHistoryModel from "../models/NoteHistory";
import { StatusNote } from "../models/enums";
import UserModel from "../models/user";

export const getNotesForUser = async (userName: string): Promise<Note[]> => {
  const user = await UserModel.findOne({ name: userName });

  if (!user) {
    throw new Error("No se encontró ningún usuario con ese nombre");
  }

  const notes: Note[] = [];
  for (const note of user.notes) {
    if (note.status === StatusNote.Active) {
      // Solo agregamos la nota si su estado es "Active"
      notes.push({ ...note });
    }
  }

  return notes;
};

export const getAllNotes = async (users: User[]): Promise<Note[]> => {
  const notes: Note[] = [];

  // Iterar sobre cada usuario
  for (const user of users) {
    // Obtener las notas del usuario y agregar el ID del usuario a cada nota
    const userNotesWithId: Note[] = user.notes.map((note: Note) => {
      return { ...note, userId: user._id };
    });

    // Agregar las notas del usuario a la matriz de notas
    notes.push(...userNotesWithId);
  }

  return notes;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const note = await NoteModel.findById(id);

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

export const savedNoteHistory = async (note: Note, id: string) => {
  // Guardar la nota actual en el historial
  const noteChanged = {
    title: note.title,
    content: note.content,
    label: note.label,
    status: StatusNote.Replaced,
    updateAt: new Date(),
  };
  const noteHistory: NoteHistory | null = await NoteHistoryModel.findById(id);
  if (noteHistory) {
    noteHistory.changes.push(noteChanged);
    await noteHistory.save();
  } else {
    const noteHistory = new NoteHistoryModel({
      noteId: id,
      changes: [noteChanged],
    });
    await noteHistory.save();
  }
};

export const updatedNote = async (
  note: Note,
  fields: NotesFiels,
  id: string
) => {
  // Actualizar la nota en la base de datos
  const updatedNote: Note = {
    ...note.toObject(),
    title: fields.title ?? note.title,
    content: fields.content ?? note.content,
    label: fields.label ?? note.label,
    updatedAt: new Date(),
  };
  await NoteModel.findByIdAndUpdate(id, updatedNote);
};
