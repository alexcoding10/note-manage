import { Schema, model, Document } from "mongoose";
import { ObjectId } from "mongodb";
import{ StatusNote, StatusUser } from "./enums";
//Definición de usuarios


export interface Note extends Document {
    title: string;
    content: string;
    label: string[];
    status: StatusNote;
    createAt: Date;
    updateAt: Date;
}

interface User extends Document {
    name: string;
    email: string; 
    password: string; // Encriptado
    profileImage: string | null;
    description: string | null;
    notes: Note[];
    status: StatusUser;
    friends: ObjectId[]; // Referencias a otros usuarios
    createAt: Date;
    updateAt: Date;
}

const noteSchema = new Schema<Note>({
    id: { type: Schema.Types.ObjectId, auto: true },
    title: String,
    content: String,
    label: [String],
    status: { type: String, enum: Object.values(StatusNote), default: StatusNote.Active },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

const userSchema = new Schema<User>({
    id: { type: Schema.Types.ObjectId, auto: true },
    name: {type: String, unique: true,required: true},
    email: { type: String, unique: true ,required: true},
    password: { type: String, required: true }, //encriptado
    profileImage: String,
    description: String,
    notes: [noteSchema],
    status: { type: String, enum: Object.values(StatusUser), default: StatusUser.Active },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
