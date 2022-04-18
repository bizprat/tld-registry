import { DomainsInterface } from '../domains.interface';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Domain implements DomainsInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('tinyint', { nullable: false })
  level: number;

  @Column('simple-array', { nullable: true })
  nameservers: Array<string>;

  @Column('boolean', { nullable: false })
  is_idna: boolean;

  @Column('json', { nullable: false, default: '{}' })
  properties: object;

  @Column('boolean', { nullable: false, default: false })
  is_public: boolean;

  @Column('boolean', {
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
