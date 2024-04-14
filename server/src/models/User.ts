import { Schema, model } from "mongoose";
import { StatusUser } from "./enums";
import { User } from "../interfaces/user";

const userSchema = new Schema<User>({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, //encriptado
  profileImage: String,
  description: String,
  notes: [String], // hace referencia al id de las notas
  status: {
    type: String,
    enum: Object.values(StatusUser),
    default: StatusUser.Active,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
