import express = require('express')
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: express.Application)

    envelope(document: any): any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
        return documents
    }

    render(res: express.Response, next: express.NextFunction, document?: any) {
        try {
            if (document) {
                this.emit('beforeRender', document)
                res.status(200).json(this.envelope(document))
            }
            return next(false);
        } catch (error) {
            throw error;
        }
    }

    renderAll(res: express.Response, next: express.NextFunction, documents?: any[]) {
        try {
            if (documents[0]) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', this.envelope(document));
                    array[index] = document
                })
                res.status(200).json(this.envelopeAll(documents));
            }
            return next(false)
        } catch (error) {
            throw error;
        }
    }

    handleError = (res: express.Response, next: express.NextFunction, error) => {
        const err = ({
            'TypeError': { 'code': 404, 'message': 'Nenhum registro encontrado!' },
            'NotFoundError': { 'code': 404, 'message': 'Nenhum registro encontrado!' },
            'RouteMissingError': { 'code': 400, 'message': 'Rota não encontrada!' },
            'ValidationError': { 'code': 400, 'message': 'Erro de validaçào!' },
            'ER_BAD_FIELD_ERROR': { 'code': 400, 'message': 'Erro ao consultar banco de dados!' },
            'ResourceNotFoundError': { 'code': 400, 'message': 'Rota não encontrada!' },
            'UniqueConstraintError': { 'code': 403, 'message': 'CPF já utilizado.' },
            'SequelizeUniqueConstraintError': { 'code': 403, 'message': 'CPF já utilizado.' }
        }[error.name] || { 'code': 500, 'message': 'Sua requisição não pode ser processada!' })

        res.status(err.code).json(err);
        next(false);

    }

}