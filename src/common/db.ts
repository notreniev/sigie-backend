import { config as configuration } from "../common/config";
const Sequelize = require('sequelize');
import { DBConnection } from './../interfaces/dbconnection.interface';
import SequelizeType from "sequelize/types/lib/sequelize";

const Mongoose = require('mongoose')

let postgresDb = null
let mongoDb = null
let config = null

if (!postgresDb) {
    postgresDb = {}

    config = configuration(process.env.NODE_ENV || 'development')

    const sequelize: SequelizeType = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.pghost,
            dialect: config.dialect,
            dialectOptions: {
                socketPath: config.dialectOptions.socketPath
            }
        })

    sequelize.authenticate()
        .then(() => { })
        .catch(err => console.error('xxxxxxxxxxxxxx Erro na conexão com o postgres!!', err))

    postgresDb['sequelize'] = sequelize
    postgresDb = <DBConnection>postgresDb
}

if (!mongoDb) {
    Mongoose.connect(`mongodb://${config.username}:${config.password}@${config.mghost}:27017/${config.database}`, {
        useNewUrlParser: true, useUnifiedTopology: true
    }, function (error) {
        if (!error) return
        console.error('xxxxxxxxxxxxxx Falha na conexão com Mongo!!', error)
    })

    mongoDb = Mongoose.connection
    mongoDb.once('open', () => { })
    mongoDb['connection'] = mongoDb
}

export const postgresDB = postgresDb.sequelize
export const mongoDB = mongoDb.connection