import { postgresDB } from "../../../../db"
import * as Sequelize from 'sequelize'

export interface Cep extends Sequelize.Model {
    id: number,
    bairro: string,
    cep: string,
    cidade: string,
    complemento2: string,
    end: string,
    uf: string,
}

export interface CelModel extends Sequelize.Model<Cep> {
    findByCep(cep: string): Promise<Cep>
}


export const CepModel = postgresDB.define('ceps', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    end: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbCeps',
    freezeTableName: false,
    timestamps: false
})

export const Cep = new CepModel()