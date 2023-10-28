import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiBody, ApiCreatedResponse, ApiResponse } from "@nestjs/swagger"

import { Role } from "./role.entity"
import { RoleService } from "./role.service"

@Controller('/roles')
export class RoleController {

    constructor(private readonly service: RoleService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: Role, isArray: true, description: 'The role list.' })
    public index() {
        return this.service.getList()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: Role, description: 'The role data.' })
    public get(@Param('id') id: string) {
        const result = this.service.getById(Number(id))
        if (result) return result
        else throw new HttpException('Role does not found!', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: Role, description: "The role data to be stored." })
    @ApiCreatedResponse({ type: Role, description: 'The saved role data.' })
    public store(@Body() body: Role) {
        const result = this.service.create(body)
        if (result) return result
        else throw new HttpException('Role already exists!', HttpStatus.BAD_REQUEST)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: Role, description: "The role data to be changed." })
    @ApiResponse({ type: Role, description: 'The saved role data.' })
    public update(@Param('id') id: string, @Body() body: Role) {
        const result = this.service.update(Number(id), body)
        if (result) return result
        else throw new HttpException('Role does not found!', HttpStatus.NOT_FOUND)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: Boolean, description: 'True if the role was deleted.' })
    public remove(@Param('id') id: string) {
        return this.service.remove(Number(id))
    }

}