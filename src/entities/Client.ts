import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
    OneToMany,
    ManyToMany
} from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';


@Entity('client')
export class Client extends Person {

    @Column({default:true, name: "active"})
    isActive: boolean

    @Column({type: "simple-json",nullable:true})
    additionalInfo: {
        age: number,
        hairColor: string
    }

    @ManyToMany(
        () => Banker
    )
    bankers: Banker[]

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transactions: Transaction[]

    @Column({
        type:"simple-array",
        default: []
    })
    familyMembers: string[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}