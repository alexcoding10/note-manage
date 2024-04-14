import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    if (conn) {
      console.log("MongoDB conectado");
    } else {
      throw new Error("Error al conectar a MongoDB");
    }
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};
