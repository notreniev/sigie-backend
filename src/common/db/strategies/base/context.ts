import ICrud from "../interfaces/interfaceCrud"

export class Context extends ICrud {
    
    constructor(protected database) {
        super()
    }

    findAll = async () => {
        return await this.database.findAll()
    }

    create(item) {
        return this.database.create(item)
    }

    read(item) {
        return this.database.read(item)
    }

    findById(item) {
        return this.database.findById(item)
    }

    findByCep(item: string) {
        return this.database.findByCep(item)
    }

    update(id, item) {
        return this.database.update(id, item)
    }

    delete(id) {
        return this.database.delete(id)
    }
}