import { AbstractRepository } from "./abstract.repository"

export abstract class AbstractService<E extends { id: number }> {

    abstract getRepository(): AbstractRepository<E>

    public async getById(id: number) {
        return await this.getRepository().findByPk(id)
    }

    public async getList() {
        return await this.getRepository().findAll()
    }

    public async create(record: E) {
        return await this.getRepository().create(record)
    }

    public async update(id: number, record: E) {
        record.id = id
        return await this.getRepository().update(record)
    }

    public async remove(id: number) {
        return await this.getRepository().delete(id)
    }

}