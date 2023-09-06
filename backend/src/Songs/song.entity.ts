import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Songs_table' })
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Song Name' })
  Song_Name: string;

  @Column()
  Band: string;

  @Column()
  year: number;
}
