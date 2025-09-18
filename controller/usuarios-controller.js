import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

let ultimoId = 0;

async function listarTodosUsuarios(req, res) {
    
    try {
    const usuarios_do_banco = await prisma.users.findMany();
    console.log(usuarios_do_banco);
    return res.status(200).json(usuarios_do_banco);
    } catch (erro) {
    console.log(erro.message);
    }
    
}

async function criarUsuario(req, res) {
    const { nome, email, idade } = req.body;

    const novoUsuario = {
    nome: nome,
    email: email,
    idade: idade,
    };

    try {
    const criarUser = await prisma.users.create({
        data: novoUsuario
    })
    return res.status(201).json(criarUser);
    } catch (erro) {
    console.log(erro.message);
    }

}

async function deletarUsuario(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }
    try {
        await prisma.users.delete({where: {id: id}});
    } catch (erro) {
        console.log(erro.message);
    }

}

async function atualizarUsuario(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    }

    const {nome, email, idade} = req.body;
    try {
    await prisma.users.update({
        where: {id: id},
        data: {
            nome: nome,
            email: email,
            idade: idade
        }
    });
    } catch (erro) {
    console.log(erro.message);
    }

}

async function listarUsuarioId(req, res) {

    const id = parseInt(req.params.id);

    try {
    const usuario =await prisma.users.findUnique({where: {id: id}});
    return res.status(200).json(usuario);
    } catch (erro) {
    console.log(erro.massage);
    }

}

export {listarTodosUsuarios, criarUsuario, deletarUsuario, atualizarUsuario, listarUsuarioId};