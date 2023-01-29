import express from "express";
import { Banker } from "src/entities/Banker";
import { Client } from "src/entities/Client";
import { Transaction, TransactionTypes } from "src/entities/Transaction";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
    const { bankerId, clientId } = req.params;

    const client = await Client.findOne(parseInt(clientId))


    const banker = await Banker.findOne(parseInt(bankerId));

    if (!banker || !client) {
        return res.json({
            msg: "Banker or client not found"
        })
    }

    banker.clients = [
        client
    ]


    await banker.save();
    return res.json({
        msg: "Banker connected to client"
    });
})

export { router as connectBankerToClient }


