import multer from 'multer'
import {v4} from 'uuid'
import {extname,resolve} from 'path'

export default{
    storage:multer.diskStorage({
        destination: resolve(__dirname,'..','..','uploads'),
        filename:(request,file,callback) => { //calback:resposta seja de erro ou sucesso
           return  callback(null,v4() + extname(file.originalname)) //extname: pega somente a extensao do arquivo
        }
    })
}