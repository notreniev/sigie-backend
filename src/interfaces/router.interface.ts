import express = require('express')
import { EventEmitter } from "events";

const notFound = {code: 404, message: 'Nenhum registro encontrado!'}

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: express.Application)

    envelope(document: any): any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
        return documents
    }

    render(res: express.Response, next: express.NextFunction) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document)
                res.status(200).json(this.envelope(document))
            } else {
                res.status(404).json(this.envelope(notFound))
            }
            return next(false)
        }
    }

    renderAll(res: express.Response, next: express.NextFunction, options: any = {}) {
        return (documents: any[]) => {
            if (documents[0]) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', this.envelope(document))
                    array[index] = document
                })
                res.status(200).json(this.envelopeAll(documents, options))
            } else {
                res.status(404).json(this.envelope(notFound))
            }
            return next(false)
        }
    }


}


