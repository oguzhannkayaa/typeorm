import {createConnection} from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import express from "express";
import { appendFile } from "fs";
import { createClientRouter } from "./routes/createClient";
import { createBankerRouter } from "./routes/createBanker";
import { createTransactionRouter } from "./routes/createTransaction";
import { connectBankerToClient } from "./routes/connectBankerToClient";
import { deleteClientRouter } from "./routes/deleteClient";
import { fetchClientRouter } from "./routes/fetchClients";


let app = express();


const main = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username:"postgres",
            password:"postgres",
            database: "typeorm",
            entities: [Client, Banker, Transaction],
            synchronize: true
        });  
        console.log("Connected to Postgres");
        
        app.use(express.json());

        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClient);
        app.use(deleteClientRouter);
        app.use(fetchClientRouter);

        app.listen(8000, () => {
            console.log("listening")
        })

    
    } catch (error) {
        console.error("not connected")
        throw new Error("unable to connect to db");
    }




}

main();