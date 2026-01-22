import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RoomsService {
  private async findRoomOrThrow(userId: string, roomId: string) {
    const room = await this.roomRepo.findOne({
        where: { room_id: roomId, user_id: userId },
      });
  
      if (!room) {
        throw new NotFoundException('Room not found');
      }
  
      return room;
  }

  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  create(userId: string, dto: CreateRoomDto) {
    const room = this.roomRepo.create({
      name: dto.name,
      user_id: userId,
    });

    return this.roomRepo.save(room);
  }

  findAll(userId: string) {
    return this.roomRepo.find({
      where: { user_id: userId }
    })
  }

  async findOne(userId: string, roomId: string) {
    return this.findRoomOrThrow(userId, roomId);
  }

  async update(userId: string, roomId: string, dto: UpdateRoomDto) {
    const room = await this.findRoomOrThrow(userId, roomId);

    Object.assign(room, dto);
    return this.roomRepo.save(room);
  }

  async remove(userId: string, roomId: string) {
    const room = await this.findRoomOrThrow(userId, roomId);

    await this.roomRepo.remove(room);
    return { success: true };
  }
}
