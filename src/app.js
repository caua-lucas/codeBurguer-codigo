import express from "express";
import routes from "./routes";
import {resolve} from 'path'
import './database'

class App {
    constructor() {
        this.app = express();
        this.middleswares();
        this.routes();
    }
    middleswares() {
        this.app.use(express.json());
        this.app.use('/product-file', express.static (resolve (__dirname,'..','uploads')))
    }
    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
