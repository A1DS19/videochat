import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SignupLocalDto } from './dto/signup-local.dto';
import * as bcrypt from 'bcryptjs';
import { TokensRes } from './types/controller-response-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_CONFIGURATION } from 'config/configuration';
import { SigninLocalDto } from './dto/signin-local.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService<ENV_CONFIGURATION>,
  ) {}

  async signupLocal(data: SignupLocalDto): Promise<TokensRes> {
    const { password, email, userName } = data;

    let user = await this.usersRepository.findOne({ where: { email } });

    if (user) throw new BadRequestException('Email already exists');

    user = await this.usersRepository.findOne({ where: { userName } });

    if (user) throw new BadRequestException('Username already exists');

    const hashedPassword = await this.hashData(password);

    user = await this.usersRepository.create({
      email,
      userName,
      password: hashedPassword,
    });

    if (!user) throw new BadRequestException('User could not be created');

    await this.usersRepository.save(user);

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateHashedRt(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(data: SigninLocalDto): Promise<TokensRes> {
    const { email, password } = data;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateHashedRt(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(uid: number) {
    const user = await this.usersRepository.findOne({
      where: { id: uid },
    });

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    user.hashedRt = null;

    await this.usersRepository.save(user);
  }

  async refreshTokens(uid: number, refreshToken: string): Promise<TokensRes> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.hashedRt IS NOT NULL')
      .andWhere('user.id = :id', { id: uid })
      .getOne();

    if (!user) throw new ForbiddenException('Access denied');

    const refreshTokenValid = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!refreshTokenValid) throw new ForbiddenException('Access denied');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.updateHashedRt(user.id, tokens.refresh_token);

    return tokens;
  }

  private async hashData(data: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(data, salt);
  }

  private async generateTokens(uid: number, email: string): Promise<TokensRes> {
    const [accessToken, refreshToken] = await Promise.all([
      //Access token
      this.jwtService.signAsync(
        {
          sub: uid,
          email,
        },
        {
          secret: this.configService.get('JWT_AT_SECRET'),
          expiresIn: 60 * 15, // 15 minutos
        },
      ),

      //Refresh token
      this.jwtService.signAsync(
        {
          sub: uid,
          email,
        },
        {
          secret: this.configService.get('JWT_RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7, // 1 semana
        },
      ),
    ]);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async updateHashedRt(
    uid: number,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: uid } });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const hashedRt = await this.hashData(refreshToken);

    user.hashedRt = hashedRt;

    await this.usersRepository.save(user);
  }
}
