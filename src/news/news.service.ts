import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  findAll() {
    return this.newsRepo.find({
      order: { published_at: 'DESC' },
    });
  }

  async findOne(slug: string) {
    const news = await this.newsRepo.findOne({
      where: { slug },
    });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return news;
  }
}
