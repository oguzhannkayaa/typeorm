import express from "express";
import { Client } from "src/entities/Client";
import { Transaction, TransactionTypes } from "src/entities/Transaction";

const router = express.Router();


router.post("/api/client/:clientId/transaction", async (req,res) => {
    
    let clientId = req.params.clientId;

    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId));

    if(!client){
        return res.json({
            msg: "client not found"
        })
    }

    const transaction = Transaction.create({
        amount,
        type,
        client
    });

    await transaction.save();

    if(type === TransactionTypes.DEPOSIT){
        client.balance = client.balance + amount;
    
    }else if(type === TransactionTypes.WITHDRAW){
        client.balance = client.balance - amount;
    }else{

    }
    
    await client.save();
    
    return res.json({
        msg: "transaction added"
    })
})

export {router as createTransactionRouter}


