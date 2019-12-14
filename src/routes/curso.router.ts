import { Router } from "../interfaces/router.interface";
import express = require('express')
import { Application } from "express";

class CursoRouter extends Router {

    constructor() {
        super()
    }

    applyRoutes(application: Application): void {
        application.get('/curso', this.findAll)
        application.get('/curso/:id', this.findById)
        application.post('/curso/add', this.create)
        application.patch('/curso', this.update)
        application.delete('/curso', this.delete)
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

export const cursoRouter = new CursoRouter()