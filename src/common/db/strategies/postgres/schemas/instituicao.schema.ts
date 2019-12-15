import { postgresDB } from "../../../../db"
const Sequelize = require('sequelize')

export const InstituicaoModel = postgresDB.define('instituicao', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbInstituicao',
    freezeTableName: false,
    timestamps: false
})

