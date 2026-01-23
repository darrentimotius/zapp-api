import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'rooms' })
@Unique(['user_id', 'name'])
export class Room {
    @PrimaryGeneratedColumn('uuid')
    room_id: string

    @Column()
    user_id: string

    @Column()
    name: string

    @Column({ type: 'timestamptz', default: () => 'now()' })
    created_at: Date;
}
