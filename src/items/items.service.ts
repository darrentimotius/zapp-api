import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  private async findRoomOrThrow(userId: string, roomId: string) {
      const room = await this.roomRepo.findOne({
          where: { room_id: roomId, user_id: userId },
        });
    
        if (!room) {
          throw new NotFoundException('Room not found');
        }
    
        return room;
    }

  async create(userID: string, roomId: string, dto: CreateItemDto) {
    await this.findRoomOrThrow(userID, roomId);

    const item = this.itemRepo.create({
      ...dto,
      room_id: roomId
    });

    return this.itemRepo.save(item)
  }

  async findAllForUser(userId: string) {
    return this.itemRepo
    .createQueryBuilder('item')
    .innerJoin(
      Room,
      'room',
      'room.room_id = item.room_id',
    )
    .where('room.user_id = :userId', { userId })
    .getMany();
  }

  async findAll(userId: string, roomId: string) {
    await this.findRoomOrThrow(userId, roomId);

    return this.itemRepo.find({
      where: { room_id: roomId }
    });
  }

  async findOne(userId: string, roomId: string, itemId: string) {
    await this.findRoomOrThrow(userId, roomId);

    const item = await this.itemRepo.findOne({
      where: {
        item_id: itemId,
        room_id: roomId
      }
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return item;
  }

  async update(userId: string, roomId: string, itemId: string, dto: UpdateItemDto) {
    console.log('dto masuk: ', dto);

    const item = await this.findOne(
      userId,
      roomId,
      itemId
    );

    Object.assign(item, dto);
    console.log('Item setelah assign: ', item);

    return this.itemRepo.save(item);
  }
  
  async remove(userId: string, roomId: string, itemId: string) {
    const item = await this.findOne(
      userId,
      roomId,
      itemId
    );
  
    await this.itemRepo.remove(item);
    return { success: true };
  }
}
