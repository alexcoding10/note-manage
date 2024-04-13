
import{ StatusUser } from "../models/enums";
import { ObjectId ,Document } from "mongodb";
import { Note } from "./note";


//INTERFACES USER
export interface User extends Document {
    name: string;
    email: string; 
    password: string; // Encriptado
    profileImage: string | null;
    description: string | null;
    notes: Note[];
    status: StatusUser;
    friends: ObjectId[]; // Referencias a otros usuarios
    createdAt: Date;
    updatedAt: Date;
}

export interface UserHistory extends Document {
    userId: ObjectId; // Referencia al ID del usuario original
    changes: {
        name?: string;
        email?: string;
        profileImage?: string;
        description?: string;
        friends?: ObjectId[];
        status?: StatusUser;
        updatedAt: Date;
    }[];
}