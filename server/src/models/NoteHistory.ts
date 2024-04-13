import { Schema, model, Document, Types } from "mongoose";
import{ StatusNote, StatusUser } from "./enums";


// Definición del modelo NoteHistory

interface NoteHistory extends Document {
    noteId: Types.ObjectId; // Referencia al ID de la nota original
    changes: {
        title?: string;
        content?: string;
        label?: string[];
        status?: StatusNote;
        updateAt: Date;
    }[];
}

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
