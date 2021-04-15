import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn , UpdateDateColumn} from 'typeorm';

@Entity('companies')
export default class Company {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  address: string;

  @Column()
  active: boolean;

  @Column()
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

}
