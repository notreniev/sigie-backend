import { Router } from "../interfaces/router.interface";
import * as express from 'express'
import { Application } from "express";
import { Context } from "../common/db/strategies/base/context";
import { AlunoModel } from "../common/db/strategies/postgres/schemas/aluno.schema";
import { Log as LogModel } from '../common/db/strategies/mongodb/schemas/log.schema';
import { Postgres } from "../common/db/strategies/postgres/postgres";
import { MongoDB } from "../common/db/strategies/mongodb/mongodb";

class AlunoRouter extends Router {
    contextPostgres = null
    contextMongo = null

    constructor() {
        super()
        this.contextPostgres = new Context(new Postgres(AlunoModel))
        this.contextMongo = new Context(new MongoDB(LogModel))
    }

    applyRoutes(application: Application): void {
        application.get('/aluno', this.findAll)
        application.get('/aluno/:id', this.findById)
        application.post('/aluno', this.create)
        application.patch('/aluno/:id', this.update)
        application.delete('/aluno/:id', this.delete)
    }

    findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

        const { aluno } = req.body

        this.contextPostgres.create(aluno)
            .then(this.render(res, next))
            .catch(next)
    }

    update = (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { id } = req.params
        const { aluno } = req.body

        this.contextPostgres.update(id, aluno)
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

export const alunoRouter = new AlunoRouter()