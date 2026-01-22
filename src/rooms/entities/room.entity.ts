import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rooms' })
export class Room {
    @PrimaryGeneratedColumn('uuid')
    room_id: string

    @Column()
    user_id: string

    @Column()
    name: string
}
