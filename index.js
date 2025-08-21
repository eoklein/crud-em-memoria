import express from 'express';

const app = express();
app.use(express.json());

const usuario_admin = {
    nome: "admin",
    email: "admin@admin",
};

let usuarios = [usuario_admin];

app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
})

app.listen(3000);


/**
 * CRUD em memória
 * criar uma rota para pegar todos os usuarios
 * criar uma rota para cadastrar um usuario
 * criar uma rota para deletar um usuario
 * criar uma rota para atualizar um usuario
 */