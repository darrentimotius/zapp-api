import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@UseGuards(SupabaseAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateRoomDto,) {
    return this.roomsService.create(req.user.id, dto)
  }

  @Get()
  findAll(@Req() req) {
    return this.roomsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req ,@Param('id') id: string) {
    return this.roomsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.roomsService.remove(req.user.id, id);
  }
}
