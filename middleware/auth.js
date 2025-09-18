export function verificarAdm(req, res, next) {

    const {tipoUser} = req.body;

    if(tipoUser === "adm" && tipoUser) {
        console.log("Rota permitida!")
        next()
    } else {
        console.log("Função não permitida a este usuario")
        return res.status(400).json({mensagem: "Função não permitida a este usuario"})
    } 
    
} 

export function verifyUser(req, res, next) {
    console.log("Aqui passou")
    
    let headers = req.headers
    

    const auth = req.headers.authorization
    console.log(auth)
    
    if(!auth.startsWith('Basic')) {
        return res.status(400).json({mensagem: "Token precisa ser basic"})
    }
    
}

export function imprimir(req, res, next) {
    console.log("Chamando API!")
    next()
}