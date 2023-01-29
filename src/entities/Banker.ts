import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
    ManyToMany,
    JoinTable,
    JoinColumn
} from 'typeorm';
import { Client } from './Client';
import { Person } from './utils/Person';

@Entity('banker')
export class Banker extends Person {

    @Column({unique:true, length:10})
    employeeNumber: string;

    @ManyToMany(
        () => Client
    )
    @JoinTable({
        name:'bankers_clients',
        joinColumn:{
            name: "banker",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'client',
            referencedColumnName: 'id'
        }
    })
    clients: Client[]


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}