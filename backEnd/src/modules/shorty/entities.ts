import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique('UQ_shortened_url', ['shortened_url'])
export class Shorty {
  @PrimaryGeneratedColumn('uuid')
    shortyId!: string

  @Column()
    original_url!: string

  @Column()
    shortened_url!: string

  @CreateDateColumn({ type: 'timestamptz', default: new Date() })
    created!: Date

  @BeforeInsert()
    create = () => {
      this.created = new Date()
    }
}
