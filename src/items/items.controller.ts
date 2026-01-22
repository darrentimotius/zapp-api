import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';

@UseGuards(SupabaseAuthGuard)
@Controller('')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('rooms/:roomId/items')
  create(@Req() req, @Param('roomId') roomId: string, @Body() dto: CreateItemDto) {
    return this.itemsService.create(
      req.user.id,
      roomId,
      dto
    );
  }

  @Get('items')
  findAllForUser(@Req() req) {
    return this.itemsService.findAllForUser(req.user.id);
  }

  @Get('rooms/:roomId/items')
  findAll(@Req() req, @Param('roomId') roomId: string) {
    return this.itemsService.findAll(
      req.user.id,
      roomId
    );
  }

  @Get('rooms/:roomId/items/:itemId')
  findOne(@Req() req, @Param('roomId') roomId: string, @Param('itemId') itemId: string) {
    return this.itemsService.findOne(
      req.user.id,
      roomId,
      itemId
    );
  }

  @Patch('rooms/:roomId/items/:itemId')
  update(@Req() req, @Param('roomId') roomId: string, @Param('itemId') itemId: string, @Body() dto: UpdateItemDto) {
    return this.itemsService.update(
      req.user.id,
      roomId,
      itemId,
      dto
    );
  }

  @Delete('rooms/:roomId/items/:itemId')
  remove(@Req() req, @Param('roomId') roomId: string, @Param('itemId') itemId: string) {
    return this.itemsService.remove(
      req.user.id,
      roomId,
      itemId
    );
  }
}
