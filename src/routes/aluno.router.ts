import { Router } from "../interfaces/router.interface";
import * as express from 'express'
import { Application } from "express";
import { Context } from "../common/db/strategies/base/context";
import { AlunoModel } from "../common/db/strategies/postgres/schemas/aluno.schema";
import { Log as LogModel } from '../common/db/strategies/mongodb/schemas/log.schema';
import { Postgres } from "../common/db/strategies/postgres/postgres";
import { MongoDB } from "../common/db/strategies/mongodb/mongodb";
import { handleError } from "../common/error-handler";

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

        try {
            const result = await this.contextPostgres.findAll();
            this.renderAll(res, next, result);
        } catch (error) {
            this.handleError(res, next, error);
        }
    }

    findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { id } = req.params

        try {
            const result = await this.contextPostgres.findById(id);
            this.render(res, next, result);
        } catch (error) {
            this.handleError(res, next, error);
        }
    }

    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { aluno } = req.body

        try {
            const result = await this.contextPostgres.create(aluno);
            this.render(res, next, result);
        } catch (error) {
            this.handleError(res, next, error);
        }
    }

    update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { id } = req.params
        const { aluno } = req.body

        try {
            const result = await this.contextPostgres.update(id, aluno);
            this.render(res, next, result);
        } catch (error) {
            this.handleError(res, next, error);
        }

    }

    delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { id } = req.params

        try {
            const result = await this.contextPostgres.delete(id);
            this.render(res, next, result);
        } catch (error) {
            this.handleError(res, next, error);
        }
    }
}

export const alunoRouter = new AlunoRouter()