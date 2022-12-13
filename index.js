const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose');
const todoHandler = require('./routes/todoHandler')
const userHandler = require('./routes/userHandler')
dotenv.config()


const port = 8000

// database connection with moongose 
mongoose.connect("mongodb+srv://mytodos:xg9pdsPGoCNXFXDL@cluster0.vmx3iz0.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Successfully Connected'))
    .catch((err) => console.log(err.message))


app.use(express.json())

app.use('/todos', todoHandler)
app.use('/user', userHandler)





app.get('/', (req, res) => {
    // res.json({
    //     message: 'it works'
    // })
    res.send('I am from response')

})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    // important to check for error 



})









