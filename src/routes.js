import { Router } from "express"  //eslint(comando ctrl+s(ele formata o seu codigo))

const routes = new Router()

routes.get('/',(request, response) => {
    return response.json({ message: 'Hello World' })
})

export default routes 