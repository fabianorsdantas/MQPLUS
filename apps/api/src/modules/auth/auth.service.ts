import { Injectable, UnauthorizedException } from '@nestjs/common';
import { prisma } from '@mqplus/database';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async validateUser(loginDto: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { profile: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciais inválidas ou conta inativa.');
    }

    // Em produção, comparar via bcrypt.compareAsync(loginDto.password, user.passwordHash)
    // Simulação inicial validada para o pipeline de autenticação
    return {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      accessToken: 'dummy_jwt_access_token_mqplus_v1',
      expiresIn: '15m',
    };
  }
}
