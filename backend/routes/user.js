const express = require('express')
const zod = require('zod');
const {User,Account} = require('../database/database');
const userRouter = express.Router()
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const { authMiddleware } = require('../middleware/middleware');
const cors = require('cors')
userRouter.use(cors())


const schema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

userRouter.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const isValidated = schema.safeParse(
        req.body
    )
    if (!isValidated.success) {
        res.json({
            error: 'invalid email or password'
        })
        return
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }


    const user = await User.create({
        username,
        password,
        firstName,
        lastName
    })
    const userId = user._id;

    await Account.create({
        userId : userId,
        balance : 1 + Math.random() * 10000
    })

    
    const token = jwt.sign({ userId }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
})

userRouter.post('/signin', async (req, res) => {
    const isValid = signinSchema.safeParse(req.body);

    if (!isValid.success) {
        res.status(411).json({
            error: 'invalid email or password'
        })
        return
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return
    }


    res.status(411).json({
        error: 'Error while logging in'
    });
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const isPass = updateSchema.safeParse(req.body)
    if (!isPass.success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
        return
    }
    await User.updateOne({
        _id: req.userId
    },req.body);

    res.status(200).json({
        msg: "Updated successfully"
    })
})

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    const user = await User.find({
        $or: [{
            firstName: {
                '$regex': filter //here $regex is used to find a parameter if filter is only a substring
            }
        },
        {
            lastName: {
                '$regex': filter
            }
        }]
    })

    if (!user) {
        res.json({
            err: 'Some error'
        })
    }

    res.json({
       user : user.map(user =>({
        username : user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
       }))
    })
})

userRouter.get('/details',authMiddleware,async(req,res)=>{
    const userId = req.userId
    const user = await User.findOne({
        _id : userId
    })
    if(!user)
    {
        req.json({
            error : 'Invalid user'
        })
        return
    }

    res.json({
        user
    })
})

module.exports = userRouter