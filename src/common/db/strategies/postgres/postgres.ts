import ICrud from "../interfaces/interfaceCrud"

export class Postgres<T> extends ICrud {

    constructor(private model) {
        super()
    }

    create = async (item: any) => {
        try {
            return await this.model.create(item)
        } catch (error) {
            console.error(error)
        }
    }

    findAll = async (): Promise<any> => {
        try {
            return await this.model.findAll({ raw: true })
        } catch (error) {
            return await error
        }
    }

    findById = async (id: number) => {
        const response = await this.model.findAll({
            limit: 1,
            raw: true,
            where: {
                id: id
            }
        })

        return response[0]
    }

    findByCep = async (cep: string) => {
        try {
            return await this.model.findAll({
                where: {
                    cep: `${cep}`
                }
            })
        } catch (error) {
            return await error
        }
    }

    update = async (id, item) => {
        const where = { where: { id: id } }
        const options = { multi: false }
        try {
            return await this.model.update(item, where, options)
        } catch (error) {
            return await error
        }
    }

    delete = async (id: number) => {
        try {
            return await this.model.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log('error ao tentar deletar ' + id, error)
        }
    }


}