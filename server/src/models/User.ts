import { Schema, model } from "mongoose";
import{ StatusNote, StatusUser } from "./enums";
import {Note} from "../interfaces/note"
import { User } from "../interfaces/user";

//Definición de usuarios
const noteSchema = new Schema<Note>({
  title: String,
  content: String,
  label: [String],
  status: {
    type: String,
    enum: Object.values(StatusNote),
    default: StatusNote.Active,
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<User>({
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
