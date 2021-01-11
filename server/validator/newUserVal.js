module.exports = {
    newUserValidator: function(req, res, next) {
        let {name, email, password} = req.body
        if ( !name || !email || !password){
            res.status(400).json('Preencha todos os campos.')
        }else if (name.length < 3 || name.length > 20){
            res.status(400).json('Nome deve conter entre 3 e 20 caracteres')
        }else if( password.length < 8 || password.length > 20){
            res.status(400).json('Senha deve conter entre 8 a 20 caracteres')
        }else{
            next()
        }
    }
}