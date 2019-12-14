import { Model } from "../../../../interfaces/model.interface"
import ICrud from "../interfaces/interfaceCrud"

export class Postgres<T> extends ICrud {
    
    model = null
    sequelize = null

    constructor(model: Model<T>) {
        super()
        this.model = model
    }

    create = (cep: string) => {
        console.log('O item foi salvo em Postgres')
        this.model.create(cep)
    }

    findAll = async () => {
        console.log('Lista de CEPs foi retornada do banco postgres')
        return await this.model.findAll({ raw: true })
    }

    findById = async (cep: string) => {
        console.log(`O CEP ${cep} foi retornado do banco postgres`)
        return await this.model.findAll({
            where: {
                cep: `${cep}`
            }
        })
    }

}