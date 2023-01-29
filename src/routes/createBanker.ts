import express from "express";
import { Banker } from "src/entities/Banker";

const router = express.Router();


router.post("/api/banker", async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        cardNumber,
        employeeNumber
    } = req.body;

    const banker = Banker.create({
        firstName,
        lastName,
        email,
        cardNumber,
        employeeNumber
    })

    await banker.save();

    return res.json(banker);

});





export {
    router as createBankerRouter
}

