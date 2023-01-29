import {
	Entity,
	Column,
    BaseEntity,
    PrimaryColumn
} from 'typeorm';

@Entity()
export class Person extends BaseEntity {

    @PrimaryColumn({type:'uuid'})
    id: string

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column({unique:true})
    email: string

    @Column({unique:true, length:10})
    cardNumber: string

    @Column({type: "numeric"})
    balance: number;

}