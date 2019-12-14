import { Router } from "../interfaces/router.interface";
import express = require('express')
import { Application } from "express";

class InstituicaoRouter extends Router {

    constructor() {
        super()
    }

    applyRoutes(application: Application): void {
        application.get('/instituicao', this.findAll)
        application.get('/instituicao/:id', this.findById)
        application.post('/instituicao/add', this.create)
        application.patch('/instituicao', this.update)
        application.delete('/instituicao', this.delete)
    }

    findAll = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }

    findById = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }

    create = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }

    update = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }

    delete = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }
}

export const instituicaoRouter = new InstituicaoRouter()