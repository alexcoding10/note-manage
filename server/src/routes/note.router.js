import { Router } from "express";

import {
  createNoteForUserHandler,
  getAllNotesForUserHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler,
} from "../controllers/note.controller.js";

const routerNote = Router();

routerNote.post("/user/:id/note", createNoteForUserHandler);

routerNote.get("/user/:id/notes", getAllNotesForUserHandler);

routerNote.get("/user/:id/note/:noteId", getNoteByIdHandler);

routerNote.put("/user/:id/note/:noteId", updateNoteHandler);

routerNote.delete("/user/:id/note/:noteId", deleteNoteHandler);

export default routerNote;
