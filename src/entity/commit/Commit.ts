import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn, UpdateDateColumn ,OneToMany } from 'typeorm';
import {Repo} from '../repo/Repo';
@Entity()
export class Commit {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column()
  repoName!: string;

  @OneToMany(() => Repo, repo => repo.commit)
  repos!: Repo[];

  @Column({ type: 'text' })
  commitMessage!: string;

  @Column()
  commitAuthor!: string;

  @Column()
  commitDate!: Date;

  @Column()
  commitUrl!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}