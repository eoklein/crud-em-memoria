import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

let ultimoId = 0;

async function listarTodosUsuarios(req, res) {
    const usuarios_do_banco = await prisma.users.findMany();
    console.log(usuarios_do_banco);
    res.status(200).json(usuarios_do_banco);
}

async function criarUsuario(req, res) {
    const { nome, email, idade } = req.body;

    const novoUsuario = {
    nome: nome,
    email: email,
    idade: idade,
    };

    const criarUser = await prisma.users.create({
        data: novoUsuario
    })
        

    res.status(201).json(criarUser);
}

async function deletarUsuario(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }
    await prisma.users.delete({where: {id: id}});
    res.status(204).send();
}

async function atualizarUsuario(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }

    const {nome, email, idade} = req.body;

    await prisma.users.update({
        where: {id: id},
        data: {
            nome: nome,
            email: email,
            idade: idade
        }
    });

    res.status(204).send();
}

async function listarUsuarioId(req, res) {

    const id = parseInt(req.params.id);
    const usuario = await prisma.users.findUnique({where: {id: id}});
    res.status(200).json(usuario);
}

export {listarTodosUsuarios, criarUsuario, deletarUsuario, atualizarUsuario, listarUsuarioId};