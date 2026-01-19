import { Router } from "express"  //eslint(comando ctrl+s(ele formata o seu codigo))
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from "./app/controllers/UserController"
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"
import CategoryController from './app/controllers/CategoryController'
import authMiddleware from './app/middlewares/auth'
import OrderController from "./app/controllers/OrderController"

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users',UserController.store)

routes.post('/sessions',SessionController.store)


routes.use(authMiddleware) //toda rota que estiver abaixo sera chamada nosso middleware(JWT)
routes.post('/products',upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes 