import Router from "express";
import {
  getNotesForUserHandler,
  getAllNotesHandler,
  updateNoteHandler,
  createdNoteHandler,
  deleteNoteHandler,
  getNoteHistoryHandler,
} from "../controllers/noteController";
import {
  validateIdParams,
  validateNoteFields,
} from "../middlewares/notes.middlewares";

const routerNote = Router();

routerNote.get("/notes", getAllNotesHandler);

routerNote.get("/user/notes", getNotesForUserHandler);

routerNote.get("/note/:id/history", (req, res) => {
  res.send("Devuelve el historial de una nota por un id");
});

routerNote.put(
  "/note/:id",
  validateIdParams,
  validateNoteFields,
  updateNoteHandler
);

routerNote.delete("/note/:id", deleteNoteHandler);

routerNote.get("/note/:id/history", (req, res) => {
  res.send("Devuelve el historial de una nota por un id");
});

routerNote.get("/note/history/:id", getNoteHistoryHandler);

routerNote.post("/note", createdNoteHandler);
