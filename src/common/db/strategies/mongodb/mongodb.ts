import * as mongoose from 'mongoose'
import ICrud from "../interfaces/interfaceCrud"

export class MongoDB<D extends mongoose.Document> extends ICrud {

    constructor(protected model: mongoose.Model<D>) {
        super()
    }

    create(item) {
        let document = this.model.create(item)
        document
            .then(res => console.log('documento salvo com sucesso', res))
            .catch(err => console.error('erro ao tentar salvar documento', err))
    }

    findAll = async () => {
        console.log('Lista de logs foi retornada do banco MongoDB')
        this.model.find()
    }

    findById = async (log) => {
        console.log(`O log foi retornado pelo banco MongoDB`)
    }

}