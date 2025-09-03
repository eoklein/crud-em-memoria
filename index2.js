import express from "express";
import {imprime} from "./middleware.js";


const app = express();
app.use(express.json());
app.use(imprime)

let usuarios = [
  {
    nome: "admin",
    email: "admin@admin"
  }
]

app.get('/usuarios', (req, res) =>{
    const limit = parseInt(req.query.limit) || usuarios.length;

    res.status(200).json(usuarios.slice(0, limit));

});


app.listen(3000)