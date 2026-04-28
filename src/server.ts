import express from "express";
import generosRouter from "./routes/genero";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/generos", generosRouter);

app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
});
