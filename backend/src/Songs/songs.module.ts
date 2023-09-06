import { CsvModule } from 'nest-csv-parser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controllers';
import { songsService } from './songs.service';
import { Song } from './song.entity';

@Module({
  imports: [CsvModule, TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [songsService],
})
export class SongsModule {}
