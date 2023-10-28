import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiBody, ApiCreatedResponse, ApiResponse } from "@nestjs/swagger"

import { User } from "./user.entity"
import { UserService } from "./user.service"

@Controller('/users')
export class UserController {

    constructor(private readonly service: UserService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: User, isArray: true, description: 'The user list.' })
    public async index() {
        return await this.service.getList()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: User, description: 'The user data.' })
    public async get(@Param('id') id: string) {
        const result = await this.service.getById(Number(id))
        if (result) return result
        else throw new HttpException('User does not found!', HttpStatus.NOT_FOUND)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: User, description: "The user data to be stored." })
    @ApiCreatedResponse({ type: User, description: 'The saved user data.' })
    public async store(@Body() body: User) {
        const result = await this.service.create(body)
        if (result) return result
        else throw new HttpException('Username already exists!', HttpStatus.BAD_REQUEST)
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: User, description: "The user data to be changed." })
    @ApiResponse({ type: User, description: 'The saved user data.' })
    public async update(@Param('id') id: string, @Body() body: User) {
        const result = await this.service.update(Number(id), body)
        if (result) return result
        else throw new HttpException('User does not found!', HttpStatus.NOT_FOUND)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ type: Boolean, description: 'True if the user was deleted.' })
    public async remove(@Param('id') id: string) {
        const removed = await this.service.remove(Number(id))
        return !removed
    }

}