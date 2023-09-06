// songs.controller.ts
import { Controller, Get } from '@nestjs/common';
import { songsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: songsService) {}

  @Get('import')
  async importSongs() {
    try {
      const importedSongs = await this.songsService.imports();
      return importedSongs;
    } catch (error) {
      throw new Error('Failed to import songs');
    }
  }
}
