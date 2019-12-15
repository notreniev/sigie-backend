import express = require('express')
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: express.Application)

    envelope(document: any): any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
        console.log('documents...[]', documents)
        return documents
    }

    renderAll(res: express.Response, next: express.NextFunction) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', this.envelopeAll(document))
                    array[index] = document
                })
                res.status(200).json(this.envelopeAll(documents))
            } else {
                if (!documents[0]) {
                    documents[0] = {
                        code: 404,
                        message: 'Não encontrado!'
                    }
                }        
                res.json(404).json(this.envelopeAll(documents))
            }
            return next(false)
        }
    }

    render(res: express.Response, next: express.NextFunction, options: any = {}) {
        return (document) => {
            if (document[0]) {
                this.emit('beforeRender', document)
                res.status(200).json(this.envelope(document))
            } else {
                if (!document[0]) {
                    document = {
                        code: 404,
                        message: 'Não encontrado!'
                    }
                }        
                res.status(404).json(this.envelope(document))
            }
            return next(false)
        }
    }

}


