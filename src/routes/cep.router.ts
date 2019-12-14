var soap = require('soap');
import express = require('express')
import { Context } from '../common/db/strategies/base/context';
import { MongoDB } from '../common/db/strategies/mongodb/mongodb';
import { Log as LogModel } from '../common/db/strategies/mongodb/schemas/log.schema';
import { Postgres } from '../common/db/strategies/postgres/postgres';
import { CepModel } from '../common/db/strategies/postgres/schemas/cep.schema';
import { Router } from '../interfaces/router.interface';

const url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";

const cepPostgresModel = CepModel
const cepMongoModel = LogModel

class CepRouter extends Router {
    contextPostgres = null
    contextMongo = null

    constructor() {
        super()
        cepPostgresModel.sync()
        this.contextPostgres = new Context(new Postgres(cepPostgresModel))
        this.contextMongo = new Context(new MongoDB(cepMongoModel))
    }

    getSoapDataAsync = async (url, args) => {
        const client = await soap.createClientAsync(url)
        return client.consultaCEPAsync(args, (err, result) => {
            return result
        })
    }
    
    applyRoutes(application: express.Application) {
        application.get('/cep', this.findAll)
        application.get('/cep/:cep', this.findById)
        application.get('cep/add', this.create)
    }
    
    findAll = async (req: express.Request, res: express.Response) => {
        try {
            const response = await this.contextPostgres.findAll()
            res.status(200).json(response)
        } catch (error) {
            res.status(200).json('error: ' + error)
        }
    }

    findById = async (req: express.Request, res: express.Response) => {
        const retorno = {}
        try {            
            const args = {cep: parseInt(req.params.cep)}
            const query = await this.contextPostgres.findById(args.cep)
            if (!query[0]){
                const response = await this.getSoapDataAsync(url, args)
                retorno['result'] = response[0].return
                this.contextPostgres.create(response[0].return)
                this.contextMongo.create(response[0].return)
                console.log('Inseriu no banco postgres')
            }else{
                console.log('retornou na consulta do banco Postgres')
                retorno['result'] = query
                const log = ({
                    timestamp: Date.now(),
                    text: `CEP ${args.cep} retornado na consulta do banco Postgres`
                })
                
                this.contextMongo.create(log)
            }
        } catch (error) {
            //retorno['error'] = error// || error.cause.root.Envelope.Body.Fault.faultstring
            throw new Error(error)
        }
        res.send(retorno)
    }

    create = (req: express.Request, res: express.Response) => {
        const { cep } = req.body
        this.contextPostgres.create(cep)
    }

}

export const cepRouter = new CepRouter()