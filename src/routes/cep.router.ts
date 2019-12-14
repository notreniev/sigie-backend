var soap = require('soap');
import express = require('express')
import { Context } from '../common/db/strategies/base/context';
import { MongoDB } from '../common/db/strategies/mongodb/mongodb';
import { Log as LogModel } from '../common/db/strategies/mongodb/schemas/log.schema';
import { Postgres } from '../common/db/strategies/postgres/postgres';
import { CepModel } from '../common/db/strategies/postgres/schemas/cep.schema';
import { Router } from '../interfaces/router.interface';

const url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";

class CepRouter extends Router {
    contextPostgres = null
    //contextMongo = null

    constructor() {
        super()
        this.contextPostgres = new Context(new Postgres(CepModel))
        //this.contextMongo = new Context(new MongoDB(LogModel))
    }

    getSoapDataAsync = async (url, args) => {
        try {
            const client = await soap.createClientAsync(url)
            return client.consultaCEPAsync(args, (err, result) => {
                return result
            })                
        } catch (error) {
            return error
        }
    }
    
    applyRoutes(application: express.Application) {
        application.get('/cep', this.findAll)
        application.get('/cep/:cep', this.findByCep)
    }
    
    findAll = async (req: express.Request, res: express.Response) => {
        try {
            const response = await this.contextPostgres.findAll()
            res.status(200).json(response)
        } catch (error) {
            res.status(200).json('error: ' + error)
        }
    }

    findByCep = async (req: express.Request, res: express.Response) => {
        const retorno = {}
        try {            
            const { cep } = req.params
            const query = await this.contextPostgres.findByCep(cep)
            if (!query[0]){
                const response = await this.getSoapDataAsync(url, {cep: cep})
                console.log(`CEP ${cep} foi consultado nos correios e retornou`, response[0].return)
                retorno['result'] = response[0].return
                this.contextPostgres.create(response[0].return)
            }else{
                retorno['result'] = query
            }
        } catch (error) {
            retorno['error'] = error?.cause?.root?.Envelope?.Body?.Fault?.faultstring
        }

        res.send(retorno)
    }
}

export const cepRouter = new CepRouter()