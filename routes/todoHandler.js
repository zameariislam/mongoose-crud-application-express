
const { ObjectID, ObjectId } = require('bson')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../schemas/todoSchema')



const Todo = new mongoose.model('Todo', todoSchema)



//   get all the todos 

router.get('/', async (req, res) => {


    try {
        const todos = await Todo.find({ status: 'active' }).select({ title: 1, description: 1 })

        console.log(todos)

        res.status(200).send({
            message: 'todo is successfully get'

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
router.post('/', async (req, res) => {

    try {
        const todo = new Todo(req.body)
        const result = await todo.save()
        console.log(result)

        res.status(200).send({
            message: 'todo is successfully added'

        })

    }
    catch (err) {


        res.status(500).send({
            message: 'There was a server side error'

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
