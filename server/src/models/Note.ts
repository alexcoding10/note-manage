import { Schema, model } from "mongoose";
import { StatusNote } from "./enums";
import { Note } from "../interfaces/note";

const noteSchema = new Schema<Note>({
  title: String,
  content: String,
  label: { type: [String], default: undefined },
  status: {
    type: String,
    enum: Object.values(StatusNote),
    default: StatusNote.Active,
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const NoteModel = model<Note>("Note", noteSchema);

export default NoteModel;
