import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'artevelde-inventory-reservation',
      logging: true,
    });
  }

  async validate(payload: any) {
    console.log("val");
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
