import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1200s' }
        }),
        UserModule,
        PassportModule,
    ],
    providers: [ AuthService, JwtStrategy ],
    controllers: [ AuthController ],
})
export class AuthModule {}
