import { postgresDB } from "../../../../db"
import * as Sequelize from 'sequelize'

export interface Instituicao extends Sequelize.Model {
    id: number,
    nome: string,
    cnpj: string,
    status: number
}

export interface CursoModel extends Sequelize.Model<Instituicao> {

}

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
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbInstituicao',
    freezeTableName: false,
    timestamps: false
})

