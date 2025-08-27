import express from 'express';

const app = express();
app.use(express.json());

let ultimoId = 1;
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "admin@admin",
};

let usuarios = [usuario_admin];

app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
});

app.post('/usuarios', (req, res) => {
    //pegar nome e email
    //do body
    const { nome, email } = req.body;
    console.log(nome);
    console.log(email);
    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }
    
    const novoUsuario = {
        nome: nome,
        email: email,
        id: ultimoId + 1
    };

    usuarios.push(novoUsuario);
    ultimoId += 1;

    return res.status(201).json(novoUsuario);

    //definir o id dele
    //adicionar ele na lista/banco de dados

    //atualizar o ultimoId
    //retornar para o front se deu sucesso(201)

});

app.listen(3000);


/**
 * CRUD em memória
 * criar uma rota para pegar todos os usuarios
 * criar uma rota para cadastrar um usuario
 * criar uma rota para deletar um usuario
 * criar uma rota para atualizar um usuario
 */