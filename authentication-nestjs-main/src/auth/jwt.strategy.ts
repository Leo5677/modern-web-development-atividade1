import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'

import { User } from '../user/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret', // process.env.SECRET_JWT,
            ignoreExpiration: false,
        })
    }

    public async validate(payload: User) {
        return payload
    }
}