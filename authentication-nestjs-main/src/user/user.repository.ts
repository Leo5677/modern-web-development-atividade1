import { Injectable } from "@nestjs/common"

import { AbstractRepository } from "../abstractions/abstract.repository"
import { User } from "./user.entity"

@Injectable()
export class UserRepository extends AbstractRepository<User> {

    constructor() {
        super(
            [{ id: 1, name: 'Uedson Reis', username: 'uedsonreis', password: '123456' } as User]
        )
    }

    public async findByUsername(username: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            resolve(this.document.find(user => user.username === username))
        })
    }
    
    public async create(record: User): Promise<User | null> {
        const alreadyExist = await this.findByUsername(record.username)
        
        return new Promise((resolve, reject) => {
            if (alreadyExist) {
                resolve(null)
            } else {
                const last = this.document[this.document.length-1]
                record.id = last.id + 1
                this.document.push(record)
                resolve(record)
            }
        })
    }
    
    public async update(record: User): Promise<User | null> {
        const finded = await this.findByPk(record.id)

        return new Promise((resolve, reject) => {
            if (finded) {
                if (record.password) {
                    finded.password = record.password
                }
                finded.name = record.name
                finded.roles = record.roles
            }
            resolve(finded)
        })
    }

}