require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const  mongoose  = require('mongoose')
const app = express()

const home = require('./routes/home')
const dashboard = require('./routes/dashboard')
const stadium = require('./routes/stadium')

app.use(urlencoded({extended:false}))
app.use(express.static('public'))
app.use(express.json())
app.set('view engine','ejs')

mongoose.connect('mongodb://localhost/Arena-Booking')
.then((connect) => {
    console.log('connected')
})
.catch(err => {
    console.log(err)
})

app.use('/', home)
app.use('/dashboard', dashboard)
app.use('/stadium', stadium)



app.listen(process.env.PORT, () => {
    console.log('server started')
})


//admin - dhaasop@gmail.com - admin123
//client - selvimsdj77@gmail.com - client123