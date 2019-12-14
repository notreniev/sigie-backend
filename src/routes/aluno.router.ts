import { Router } from "../interfaces/router.interface";
import express = require('express')
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
        application.patch('/aluno', this.update)
        application.delete('/aluno', this.delete)
    }

    findAll = async (req: express.Request, res: express.Response) => {
        try {
            const response = await this.contextPostgres.findAll()
            if (response[0]) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ code: res.statusCode, message: "Nenhum resultado encontrado" })
            }
        } catch (error) {
            res.status(500).json({ code: res.statusCode, error: error })
        }
    }

    findById = async (req: express.Request, res: express.Response) => {
        const { id } = req.params
        try {
            const response = await this.contextPostgres.findById(id)
            if (response[0]) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ code: res.statusCode, message: `Nenhum resultado encontrado com o id ${id}` })
            }
        } catch (error) {
            res.status(500).json({ code: res.statusCode, error: error })
        }
    }

    create = (req: express.Request, res: express.Response) => {
        try {
            const { aluno } = req.body
            this.contextPostgres.create(aluno)
            res.status(200).json(aluno)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    update = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }

    delete = (req: express.Request, res: express.Response) => {
        res.json('Não implementado!')
    }
}

export const alunoRouter = new AlunoRouter()