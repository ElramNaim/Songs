// app.parser.ts
import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import fs = require('fs');
class Entity {
  constructor(
    public foo: string,
    public bar: string,
  ) {}
}

@Injectable()
export class AppService {
  constructor(private readonly csvParser: CsvParser) {}

  
  async imports() {
    // Create stream from file (or get it from S3)
    const stream = fs.createReadStream(__dirname + 'src\Songs\F-S Test - T02 - 2023 - Song_list.csv');
    const entities: Promise<Entity[]> = (await this.csvParser.parse(
      stream,
      Entity,
    )) as unknown as Promise<Entity[]>;
    return entities;
  }
}
