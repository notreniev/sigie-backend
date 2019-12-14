import { postgresDB } from "../../../../db"
const Sequelize = require('sequelize')

export const CursoModel = postgresDB.define('curso', {
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
    duracao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbCurso',
    freezeTableName: false,
    timestamps: false
})

