import { Injectable } from "@nestjs/common"

import { AbstractRepository } from "../abstractions/abstract.repository"
import { Role } from "./role.entity"

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {

    constructor() {
        super(
            [{ id: 1, name: 'ADMIN', description: 'Permissões de administrador' } as Role]
        )
    }

    public async findByName(name: string): Promise<Role | null> {
        return new Promise((resolve, reject) => {
            resolve(this.document.find(role => role.name === name))
        })
    }
    
    public async create(record: Role): Promise<Role | null> {
        const alreadyExist = await this.findByName(record.name)
        
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
    
    public async update(record: Role): Promise<Role | null> {
        const finded = await this.findByPk(record.id)

        return new Promise((resolve, reject) => {
            if (finded && record.description) {
                finded.description = record.description
            }
            resolve(finded)
        })
    }

}