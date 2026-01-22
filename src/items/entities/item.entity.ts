import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export type DayOfWeek =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';


@Entity({ name: 'items' })
@Unique(['room_id', 'name'])
export class Item {
    @PrimaryGeneratedColumn('uuid')
    item_id: string

    @Column()
    room_id: string

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ],
        array: true
    })
    usage_days: DayOfWeek[]

    @Column({ type: 'time' })
    start_time: string

    @Column({ type: 'time' })
    end_time: string

    @Column({ type: 'int' })
    usage_watt: number
}
