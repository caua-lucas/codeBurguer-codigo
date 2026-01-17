import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'


class SessionController{
   async store(request,response){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const userEmailPasswordIncorrect = () =>{ //funcao para reduzir linhas de codigo,pois é a mesma mensagem a ser enviada durante a validação
            return response.status(400).json({error: "Make sure your password or email are correct"})
        }
        if(!(await schema.isValid(request.body))){
            userEmailPasswordIncorrect()
        }
        const {email, password} = request.body
        const user = await User.findOne({
            where:{email},
        })
        if(!user){
           userEmailPasswordIncorrect()
        }
        if(! (await user.checkPassword(password))){
           userEmailPasswordIncorrect()
        }
        return response.json({id: user.id,
             email, 
             name: user.name,
             admin:user.admin,
             token:jwt.sign({id: user.id,name:user.name},authConfig.secret, {expiresIn:authConfig.expiresIn} )}) //({informação criptografada},"tem que ser uma string(gerando um hash a partir de uma palavra"),quando nosso token vai expirar('5d'= 5 dias)
        
    }
    
}

export default new SessionController()