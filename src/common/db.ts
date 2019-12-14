import { config as configuration } from "../common/config";
const Sequelize = require('sequelize')
const Mongoose = require('mongoose')

let postgresDb = null
let mongoDb = null
let config = null

if (!postgresDb) {
    postgresDb = {}

    config = configuration(process.env.NODE_ENV || 'development')

    const sequelize = new Sequelize(
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
    postgresDb['sequelize'] = sequelize
}

if (!mongoDb) {
    Mongoose.connect(`mongodb://${config.username}:${config.password}@${config.mghost}:27017/${config.database}`, {
        useNewUrlParser: true
    }, function (error) {
        if (!error) return
        console.log('>>>>>>>>> falha na conexão', error)
    })

    mongoDb = Mongoose.connection
    mongoDb.once('open', () => console.log('>>>>>>>> database rodando!!!'))
    mongoDb['connection'] = mongoDb
}

export const postgresDB = postgresDb.sequelize
export const mongoDB = mongoDb.connection