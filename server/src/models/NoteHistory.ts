import { Schema, model, Document, Types } from "mongoose";
import{ StatusNote } from "./enums";
import {NoteHistory} from "../interfaces/note"

// Definición del modelo NoteHistory

const noteHistorySchema = new Schema<NoteHistory>({
    noteId: { type: Schema.Types.ObjectId, ref: "Note" }, // Referencia al ID de la nota original
    changes: [{
        title: String,
        content: String,
        label: [String],
        status: { type: String, enum: Object.values(StatusNote) },
        updateAt: { type: Date, default: Date.now }
    }]
});

const NoteHistoryModel = model<NoteHistory>("NoteHistory", noteHistorySchema);

export default NoteHistoryModel;
