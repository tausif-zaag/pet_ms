import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OwnerRepository } from '../modules/owner/owner.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private ownersRepository: OwnerRepository,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        console.log(email, pass);
        const owner = await this.ownersRepository.createQueryBuilder('owner').where('owner.email = :email', { email }).getOne();
        console.log(owner);
        if (!owner) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(pass, owner.password);
        console.log('Password valid: ', isPasswordValid);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: owner.id, firstName: owner.firstName };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
