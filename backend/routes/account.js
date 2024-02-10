const express = require('express');
const { default: mongoose } = require('mongoose');
const { Account } = require('../database/database');
const { authMiddleware } = require('../middleware/middleware');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {

    const token = req.userId

    const AcDetails = await Account.findOne({
        userId : token
    });

    res.json({
        balance: AcDetails.balance
    })
})


accountRouter.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction()

    const fromAccount = req.userId
    const toAccount = req.body.to
    const amount = req.body.amount


    const donor = await Account.findOne({ userId: fromAccount }).session(session)

    if (!donor || donor.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            error: 'Insufficient balance'
        })
    }

    const toAcc = await Account.findOne({ userId: toAccount }).session(session);

    if (!toAcc) {
        await session.abortTransaction()
        return res.status(403).json({
            error: 'Invalid Account'
        })
    }

    //Performing transaction and assighning them into a single Session
    //So that they can happen simultaneously so on and so forth
    await Account.updateOne({userId : fromAccount}, {
        '$inc': { balance: -amount }
    }).session(session)

    await Account.updateOne({userId : toAccount}, {
        '$inc': { balance: amount }
    }).session(session)

    //Starting the session 
    await session.commitTransaction()

    res.json({
        msg: 'Transfer Succesfull'
    })
})


module.exports =  accountRouter 