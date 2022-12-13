const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const mongoose = require('mongoose')
let jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema')


const User = mongoose.model('User', userSchema)

router.use(express.json())



//  signup

router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        })
        const result = await user.save()
        console.log(result)

        res.status(200).send({
            message: 'Sigup was successfull'

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }


})

// login 


router.post('/login', async (req, res) => {


    try {
        const user = await User.find({

            username: req.body.username,

        })
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)
            if (isValidPassword) {

                // generate token 
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRET,
                    { expiresIn: '1h' })
                res.status(200).json({
                    'access-token': token,
                    'message': 'login successfully'

                })





            }
            else {
                res.status(401).send({
                    error: 'Authentication Failed'

                })

            }

        }
        else {
            res.status(401).send({
                error: 'Authentication Failed'

            })

        }



        const result = await user.save()
        console.log(result)

        res.status(200).send({
            message: 'Sigup was successfull'

        })

    }
    catch (err) {


        res.status(401).send({
            error: 'Authentication Failed'

        })

    }


})

// get all users 

router.get('/all', async (req, res) => {
    try {

        const data = await User.find({}).populate('todos')


        res.status(200).send({
            message: 'sucsess',
            data


        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }






})





module.exports = router

















