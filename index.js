import express from 'express';
import rotaUsuarios from './rotas/rota-usuarios.js';

const app = express();
app.use(express.json());
app.use("/usuarios", rotaUsuarios);

app.listen(3000);

