import { Schema, model, Document, Types } from "mongoose";
import{ StatusNote, StatusUser } from "./enums";


interface UserHistory extends Document {
    userId: Types.ObjectId; // Referencia al ID del usuario original
    changes: {
        name?: string;
        email?: string;
        profileImage?: string;
        description?: string;
        friends?: Types.ObjectId[];
        status?: StatusUser;
        updateAt: Date;
    }[];
}

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
