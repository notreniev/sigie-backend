import { postgresDB } from "../../../../db"
import * as Sequelize from 'sequelize'

export interface Aluno extends Sequelize.Model {
    id: number,
    nome: string,
    cpf: string,
    email?: string,
    celular?: string,
    data_nascimento?: string,
    cep?: string,
    endereco?: string,
    numero?: number,
    complemento?: string,
    bairro?: string,
    cidade?: string,
    uf?: string,
    status?: number
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
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: true
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'tbAluno',
    freezeTableName: false,
    timestamps: false
})
