import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { OwnerRepository } from '../owner/owner.repository';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' },
        })],
    providers: [
        AuthService,
        OwnerRepository,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }],
    controllers: [AuthController],
})
export class AuthModule {
}
