import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseAuthGuard } from './auth/supabase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return {
      name: 'ZAPP! API',
      status: 'ok'
    }
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  me(@Req() req) {
    return req.user;
  }

  @Get('health')
  health() {
    return this.appService.health();
  }
}
