import express from "express";

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

//inicializacion de servidor
app.listen(PORT, () =>
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
);
