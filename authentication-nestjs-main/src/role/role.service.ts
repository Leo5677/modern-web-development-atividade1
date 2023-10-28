import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { AbstractRepository } from "src/abstractions/abstract.repository"
import { AbstractService } from "src/abstractions/abstract.service"

import { Role } from "./role.entity"
import { RoleRepository } from "./role.repository"

@Injectable()
export class RoleService extends AbstractService<Role> {

    constructor(
        private readonly repository: RoleRepository
    ) {
        super()
    }

    getRepository() {
        return this.repository
    }

}