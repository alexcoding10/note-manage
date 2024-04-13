import { Schema, model,Types } from "mongoose";
import{ StatusUser } from "./enums";
import {UserHistory} from "./interfaces"

const userHistorySchema = new Schema<UserHistory>({
    userId: { type: Schema.Types.ObjectId, ref: "User" }, // Referencia al ID del usuario original
    changes: [{
        name: String,
        email: String,
        profileImage: String,
        description: String,
        friends: [{ type: Types.ObjectId, ref: "User" }],
        status: { type: String, enum: Object.values(StatusUser) },
        updateAt: { type: Date, default: Date.now }
    }]
});

const UserHistoryModel = model<UserHistory>("UserHistory", userHistorySchema);

export default UserHistoryModel;
