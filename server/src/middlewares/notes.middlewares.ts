import { NextFunction } from "express";
import { Note, ResquesNoteFields } from "../interfaces/note";

// Middleware para validar la existencia de título, contenido y etiqueta
export const validateNoteFields = (
  req: ResquesNoteFields,
  res: any,
  next: NextFunction
) => {
  const { title, content, label } = req.body;
  // Array para almacenar los campos faltantes
  const missingFields: string[] = [];

  // Verificar si algún campo falta o es inválido
  if (!title) {
    missingFields.push("title");
  }
  if (!content) {
    missingFields.push("content");
  }
  if (!label) {
    missingFields.push("label");
  }
  // Si hay campos faltantes, enviar un mensaje de error
  if (missingFields.length > 0) {
    const errorMessage = `The following fields are required: ${missingFields.join(
      ", "
    )}`;
    return res.status(400).send(errorMessage);
  }
  next(); // Llama a la siguiente función en la cadena de middlewares
};

export const validateIdParams = async (
  req: { params: { id: string } },
  res: any,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Id is required");
  }
  next();
};
