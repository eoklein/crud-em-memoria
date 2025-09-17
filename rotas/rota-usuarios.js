import { Router } from "express";
import { listarTodosUsuarios, criarUsuario, deletarUsuario, atualizarUsuario, listarUsuarioId } from "../controller/usuarios-controller.js";
import { verificarAdm } from "../middleware/auth.js";

const roteadorUsers = Router();

let ultimoId = 1;

roteadorUsers.get("/", (req, res) => {
  listarTodosUsuarios(req, res)
});

roteadorUsers.post("/", verificarAdm,  (req, res) => {
  criarUsuario(req, res)
});

roteadorUsers.delete("/:id", verificarAdm, (req, res) => {
  deletarUsuario(req, res)
});

roteadorUsers.patch("/:id", verificarAdm, (req, res) => {
  atualizarUsuario(req, res)
});

roteadorUsers.get("/:id", (req, res) => {
  listarUsuarioId(req, res)
});

export default roteadorUsers;