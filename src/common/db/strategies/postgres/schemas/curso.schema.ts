import { postgresDB } from "../../../../db"
import * as Sequelize from 'sequelize'

export interface Curso extends Sequelize.Model {
    id: number,
    nome: string,
    duracao: string,
    status: string
}

export interface CursoModel extends Sequelize.Model<Curso> {

}

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

