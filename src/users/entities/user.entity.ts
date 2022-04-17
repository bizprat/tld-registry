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

  @Column('varchar', {
    name: 'first_name',
    length: 20,
    nullable: true,
  })
  firstName: string;

  @Column('varchar', {
    name: 'middle_name',
    length: 20,
    nullable: true,
  })
  middleName: string;

  @Column('varchar', {
    name: 'last_name',
    length: 20,
    nullable: true,
  })
  lastName: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('simple-array', { nullable: true })
  phone: Array<string>;

  @Column('tinyint', {
    name: 'country_id',
    nullable: true,
  })
  countryId: number;

  @Column('tinyint', {
    name: 'state_id',
    nullable: true,
  })
  stateId: number;

  @Column('tinyint', {
    name: 'city_id',
    nullable: true,
  })
  cityId: number;

  @Column('mediumint', {
    name: 'postal_code',
    nullable: true,
  })
  postalCode: number;

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
