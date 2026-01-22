import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class News {
    @PrimaryGeneratedColumn('uuid')
    news_id: string

    @Column()
    title: string

    @Column({ unique: true })
    slug: string;

    @Column('text')
    content: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    image_url?: string;

    @Column({ type: 'timestamptz' })
    published_at: Date;

    @Column({ type: 'timestamptz', default: () => 'now()' })
    created_at: Date;
}
