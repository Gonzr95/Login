import express from "express";
import cors from "cors";
import { connectDB } from "./db/sequelize.js";
connectDB();
//import usersRouter from "./routes/users.js";

const app = express();
app.disable('x-powered-by');
const port = 3000;

// ********** Middlewares **********
app.use(
  cors({
    origin: [
      '*'
    ],
  })
);
app.use(express.json()); //Cada vez que llegue body con json convertilo a un objeto JS


// Rutas
//app.use(usersRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Home Server</title>
    </head>
    <body style="font-family:sans-serif; text-align:center; margin-top:100px;">
      <h1>¡Hola Mundo!</h1>
    </body>
    </html>
  `);
  res.statusCode = 200;
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});