import express from "express";
import { Client } from "src/entities/Client";
import { createQueryBuilder, QueryBuilder } from "typeorm";


const router = express.Router();


router.get('/api/clients', async (req,res) => {

    const client = await createQueryBuilder(
        'client'
    )
    .select('client.firstName')
    .addSelect('client.lastName')
    .addSelect('SUM(transaction)',"sum")
    .from(Client, 'client')
    .leftJoinAndSelect(
        'client.transactions',
        'transactions'
    )
    .where('client.clientId = :clientId', {clientId:3})
    .groupBy('clientId')
    .getOne()

    return res.json(client);
})


export {router as fetchClientRouter}

