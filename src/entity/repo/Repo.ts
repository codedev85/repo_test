import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn, UpdateDateColumn , ManyToOne } from 'typeorm';
import { Commit } from '../commit/Commit';


@Entity({ name: 'repositories' })
export class Repo {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @ManyToOne(() => Commit, commit => commit.repos)  
  commit!: Commit;

  @Column()
  repoName!: string;

  @Column({ type: 'text' , nullable: true })
  repoDescription!: string | null;

  @Column()
  repoUrl!: string;

  @Column()
  repoLanguage!: string;

  @Column()
  repoForksCount!: Number;


  @Column()
  repoStarsCount!: Number;

  @Column()
  repoOpenIssueCount!: Number;

  @Column()
  repoWatchersCount!: Number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}