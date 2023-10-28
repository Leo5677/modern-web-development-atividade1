import { ApiProperty } from "@nestjs/swagger"

export class Role {

    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    description?: string

}