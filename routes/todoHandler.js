
const { ObjectId } = require('bson')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../schemas/todoSchema')
const userSchema=require('../schemas/userSchema')
const checkAuth = require('../middlewares/checkAuth')



const Todo = mongoose.model('Todo', todoSchema)
const User = mongoose.model('User', userSchema)




//   get all the todos 

router.get('/', checkAuth,  async (req, res) => {



    try {
        const todos = await Todo.find({ }).populate('user').select({ title: 1, description: 1 })

       

        res.status(200).send({
           
            message: 'todo is successfully get',
            data:todos,

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'
            // message: err.message



        })

    }





})
// get active 

router.get('/active', async (req, res) => {


    try {
        const todo = new Todo()
        const data = await todo.findActive()


        res.status(200).send({
            data

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }





})

router.get('/Js', async (req, res) => {


    try {

        const data = await Todo.findByJs()


        res.status(200).send({
            data

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }





})


// get a todo 
router.get('/:id', async (req, res) => {

    try {
        const todo = await Todo.find({ _id: req.params.id })

        console.log(todo)

        res.status(200).send({
            message: 'todo is successfully get'

        })

    }
    catch (err) {


        res.status(500).send({
            message: err.message

        })

    }

})

// POST A TODO 
router.post('/', checkAuth, async (req, res) => {

    try {
        const todo = new Todo({...req.body,
            user:req.userId
            })
           await  User.updateOne({_id:req.userId},{
                $push:{
                    todos:todo._id
                }
            })
        const result = await todo.save()
        console.log(result)

        res.status(200).send({
            message: 'todo is successfully added'

        })

    }
    catch (err) {


        res.status(500).send({
            // message: 'There was a server side error'
            message: err.message

        })

    }

})
// post multiple todo 
router.post('/all', async (req, res) => {
    try {

        const result = await Todo.insertMany(req.body)


        res.status(200).send({
            message: 'todos are successfully added'

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }






})

// put  todo 
router.put('/:id', async (req, res) => {


    try {

        const result = await Todo.findByIdAndUpdate({ _id: ObjectId(req.params.id) },

            {
                $set: {
                    status: 'inactive'
                }
            },
            {
                new: true
            }
        )

        console.log(result)

        res.status(200).send({
            message: 'todos are successfully added'

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

        })

    }




})
// delete  todo 
router.delete('/:id', async (req, res) => {

    try {

        const result = await Todo.deleteOne({ _id: req.params.id })
        console.log(result)


        res.status(200).send({
            message: 'todos are successfully deleted'

        })

    }
    catch (err) {


        res.status(500).send({
            error: 'There was a server side error'

        })

    }


})

module.exports = router
