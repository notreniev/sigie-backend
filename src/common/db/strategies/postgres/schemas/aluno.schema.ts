import { postgresDB } from "../../../../db"
import * as Sequelize from 'sequelize'

export interface Aluno extends Sequelize.Model {
    id: number,
    nome: string,
    cpf: string,
    data_nascimento: string,
    email: string,
    celular: string,
    endereco: string,
    numero: number,
    bairro: string,
    cidade: string,
    uf: string,
    status: string
}

export interface AlunoModel extends Sequelize.Model<Aluno> {

}

export const AlunoModel = postgresDB.define('aluno', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: true
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbAluno',
    freezeTableName: false,
    timestamps: false
})
