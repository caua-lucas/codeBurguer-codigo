import { Router } from "express"  //eslint(comando ctrl+s(ele formata o seu codigo))
import UserController from "./app/controllers/UserController"
const routes = new Router()

routes.post('/users',UserController.store)

export default routes 