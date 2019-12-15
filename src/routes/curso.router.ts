import { Router } from "../interfaces/router.interface";
import express = require('express')
import { Application } from "express";
import { Context } from "../common/db/strategies/base/context";
import { Log as LogModel } from '../common/db/strategies/mongodb/schemas/log.schema';
import { Postgres } from "../common/db/strategies/postgres/postgres";
import { MongoDB } from "../common/db/strategies/mongodb/mongodb";
import { CursoModel } from "../common/db/strategies/postgres/schemas/curso.schema";

class CursoRouter extends Router {
    contextPostgres = null
    contextMongo = null

    constructor() {
        super()
        this.contextPostgres = new Context(new Postgres(CursoModel))
        this.contextMongo = new Context(new MongoDB(LogModel))
    }

    applyRoutes(application: Application): void {
        application.get('/curso', this.findAll)
        application.get('/curso/:id', this.findById)
        application.post('/curso', this.create)
        application.patch('/curso/:id', this.update)
        application.delete('/curso/:id', this.delete)
    }

    findAll = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        this.contextPostgres.findAll()
            .then(this.renderAll(res, next))
            .catch(next)
    }

    findById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params
        this.contextPostgres.findById(id)
            .then(this.render(res, next))
            .catch(next)
    }

    create = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { curso } = req.body
        this.contextPostgres.create(curso)
            .then(this.render(res, next))
            .catch(next)
    }

    update = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params
        const { curso } = req.body
        this.contextPostgres.update(id, curso)
            .then(this.render(res, next))
            .catch(next)
    }

    delete = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params
        this.contextPostgres.delete(id)
            .then(this.render(res, next))
            .catch(next)
    }
}

export const cursoRouter = new CursoRouter()