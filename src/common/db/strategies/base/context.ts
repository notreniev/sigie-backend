import ICrud from "../interfaces/interfaceCrud"

export class Context extends ICrud{
    database
    constructor(protected strategy) {
        super()
        this.database = strategy
    }

    findAll() {
        return this.database.findAll()
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

    update(id, item) {
        return this.database.update(id, item)
    }

    delete(id) {
        return this.database.delete(id)
    }
}