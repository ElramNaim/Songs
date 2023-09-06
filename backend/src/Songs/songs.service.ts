// app.parser.ts
import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fs = require('fs');
import { Song } from './song.entity';

@Injectable()
export class songsService {
  constructor(
    private readonly csvParser: CsvParser,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async imports() {
    // Create stream from file
    const stream = fs.createReadStream(
      'src/Songs/F-S Test - T02 - 2023 - Song_list.csv',
    );
    const listSongs = (await this.csvParser.parse(
      stream,
      Song,
    )) as unknown as Promise<Song[]>;

    const parsedSongsArray = Object.values(listSongs);
    const flatParsedSongs = parsedSongsArray.flat();

    // Filter and transform the data
    const filteredSongs = flatParsedSongs.filter((song) => {
      if (song instanceof Song) {
        return Object.keys(song).some((key) => key.startsWith('Song'));
      }
      return false;
    });

    // Transform and save the filtered data to the database
    const transformedSongs = filteredSongs.map((filteredSong) => {
      const songEntity = new Song();
      songEntity.Song_Name = filteredSong['Song Name'];
      songEntity.Band = filteredSong.Band;
      songEntity.year = filteredSong.Year;
      return songEntity;
    });

    // Save the transformed data to the database
    await this.songRepository.save(transformedSongs);

    // Return the saved data
    return transformedSongs;
  }
}
