import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AbstractRepository } from "src/abstractions/abstract.repository"
import { AbstractService } from "src/abstractions/abstract.service"

import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService extends AbstractService<User> {

    constructor(
        private readonly repository: UserRepository
    ) {
        super()
    }

    getRepository() {
        return this.repository
    }

    public removePassword(user: User) {
        const { password, ...rest } = user
        return rest
    }

    public async getById(id: number) {
        const result = await super.getById(id)
        if (result) return this.removePassword(result)
        else return null
    }

    public async getList() {
        return (await super.getList()).map(user => {
            return this.removePassword(user)
        })
    }

    public async getByUsername(username: string) {
        return await this.repository.findByUsername(username)
    }

    public async create(record: User) {
        const result = await super.create(record)
        if (result) return this.removePassword(result)
        else return null
    }

    public async update(id: number, record: User) {
        const result = await super.update(id, record)
        if (result) return this.removePassword(result)
        else null
    }

}