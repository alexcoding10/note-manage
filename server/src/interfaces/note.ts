
import{ StatusNote} from "../models/enums";
import { ObjectId ,Document } from "mongodb";


//INTERFACES NOTE
export interface Note extends Document {
    title: string;
    content: string;
    label: string[];
    status: StatusNote;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
}

export interface NoteHistory extends Document {
    noteId: ObjectId; // Referencia al ID de la nota original
    changes: {
        // siempre tendran estos datos 
        title: string; 
        content: string;
        label: string[];
        status: StatusNote;
        updateAt: Date;
    }[];
}

