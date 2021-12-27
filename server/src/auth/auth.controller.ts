import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUserID } from './decorators/get-current-user-id.decorator';
import { CurrentUser } from './decorators/get-current-user.decorator';
import { Public } from './decorators/public.decorator';
import { SigninLocalDto } from './dto/signin-local.dto';
import { SignupLocalDto } from './dto/signup-local.dto';
import { RtGuard } from './guards/refresh-token.guard';
import { TokensRes } from './types/controller-response-types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() data: SignupLocalDto): Promise<TokensRes> {
    return await this.authService.signupLocal(data);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() data: SigninLocalDto): Promise<TokensRes> {
    return await this.authService.signinLocal(data);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUserID() uid: number) {
    return this.authService.logout(uid);
  }

  @Public() //bypass AtGuard
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @CurrentUserID() uid: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(uid, refreshToken);
  }
}
