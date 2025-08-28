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

    return res.status(201).json(novoUsuario.id);

});

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idNumerico = parseInt(id);
    
    if (isNaN(idNumerico)) {
        return res
            .status(400)
            .json({ mensagem: "ID inválido" });
    }

    let posicao_do_usuario = usuarios.findIndex((usuario) => usuario.id === idNumerico);
    if (posicao_do_usuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuarios.splice(posicao_do_usuario, 1);
    return res.status(204).send();
});

app.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { nome, email } = req.body;

    if (!nome && !email) {
        return res.status(400).json({ mensagem: "Nome ou email são obrigatórios" });
    }

    if (email) {
        let email_existe = usuarios.findIndex((usuario) => usuario.email === email);

        if (email_existe !== -1) {
            return res.status(400).json({ mensagem: "Email já cadastrado" });
        }

        usuario.email = email;

        return res.status(200).json(usuario);
    }

    if (nome) {
        let usuario_existe = usuarios.findIndex((usuario) => usuario.nome === nome);

        if (usuario_existe !== -1) {
            return res.status(400).json({ mensagem: "Nome já cadastrado" });
        }

        usuario.nome = nome;

        return res.status(200).json(usuario);
    }
});

app.get ("/usuarios/:id", (req, res) => {
    return usuarios.find((usuario) => usuario.id === parseInt(req.params.id));
});    


app.listen(3000);


