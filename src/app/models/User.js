import Sequelize,{Model} from 'sequelize'
import bycrpt from 'bcrypt'

class User extends Model {
    static init (sequelize){
        super.init({
            name: Sequelize.STRING,
            email:Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash:Sequelize.STRING,
            admin:Sequelize.BOOLEAN,
        },{
            sequelize,
        })
        this.addHook('beforeSave',async(user) => { //beforSave:antes de salvar no banco
            if(user.password){
                user.password_hash = await bycrpt.hash(user.password,10)
            }
        })
        return this
    }
    checkPassword(password){
      return  bycrpt.compare(password, this.password_hash)
    }
}
export default User