import { Router } from "express";

import {
  createNoteForUserHandler,
  getAllNotesForUserHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler,
  getNoteHistoryHandler
} from "../controllers/note.controller.js";
import {checkToken} from "../middleware/auth.middleware.js";

const routerNote = Router();

routerNote.post("/note", checkToken, createNoteForUserHandler);

routerNote.get("/notes", checkToken, getAllNotesForUserHandler);

routerNote.get("/note/:noteId", checkToken, getNoteByIdHandler);

routerNote.get("/note/:noteId/history", checkToken, getNoteHistoryHandler);

routerNote.put("/note/:noteId", checkToken, updateNoteHandler);

routerNote.delete("/note/:noteId",checkToken,deleteNoteHandler);

export default routerNote;
