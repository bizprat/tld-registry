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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'first_name', length: 20, nullable: true })
  firstName: string;

  @Column('varchar', { name: 'middle_name', length: 20, nullable: true })
  middleName: string;

  @Column('varchar', { name: 'last_name', length: 20, nullable: true })
  last_name: string;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('simple-array', { nullable: true })
  phone: Array<string>;

  @Column('tinyint', { nullable: true })
  country_id: number;

  @Column('tinyint', { nullable: true })
  state_id: number;

  @Column('tinyint', { nullable: true })
  city_id: number;

  @Column('mediumint', { nullable: true })
  postal_code: number;

  @Column('boolean', { default: true, nullable: false })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
