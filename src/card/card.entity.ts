import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  idNumber: string;

  @Column({ nullable: false })
  dateReported: string;

  @Column({ nullable: true })
  dob: string;

  @Column()
  profileImg: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  repoter_name: string;

  @Column({ nullable: true })
  repoter_phone: string;

  @Column({ nullable: true })
  repoter_address: string;

  @Column({ nullable: true })
  locationOfDocument: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
