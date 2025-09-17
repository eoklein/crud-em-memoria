// Função middleware que verifica se o usuário é administrador
export function verificarAdm(req, res, next) {

    // Extrai a propriedade "tipoUser" do corpo da requisição
    const { tipoUser } = req.body;

    // Verifica se o tipo de usuário é "ADM"
    if (tipoUser === "adm") {
        // Se for ADM, envia uma resposta com status 201 e mensagem de sucesso
        res.status(201).json({ mensagem: "Rota permitida!" });

        // Chama o próximo middleware ou rota na cadeia
        next();
    } else {
        // Caso o tipoUser não seja "ADM", registra no console que o acesso foi negado
        console.log("Função não permitida a este usuario");

        // Retorna uma resposta de erro com status 401 (Não autorizado)
        return res.status(401).json({ mensagem: "Função não permitida a este usuario" });
    }

}

// Middleware simples que imprime uma mensagem no console
export function imprimir(req, res, next) {
    // Mensagem indicando que a API foi chamada
    console.log("Chamando API!");

    // Continua para o próximo middleware ou rota
    next();
}
