const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/', (req, res) => {
    var {name} = req.body
    res.status(200).json(name)
})

app.get('/', (req, res) => {
    res.json('Ta funcionando')
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server running on PORT ${PORT}`)
    }
})