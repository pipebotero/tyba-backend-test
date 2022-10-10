import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuth } from './localAuth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BlacklistGuard } from './jwt-blacklist.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuth)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const jwtRes = this.authService.getJwtToken(user.id);
    return response.send(jwtRes);
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const tokenToDisable = request.headers.authorization.split(' ')[1];
      this.authService.saveJwtInBlacklist(tokenToDisable);
      return response.sendStatus(200);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    const tokenBL = await this.authService.findJwtInBlacklist(token);
    if (!tokenBL) return request.user;
  }
}
