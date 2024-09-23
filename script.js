const { error } = require('console');
const express = require('express')
const app = express()

app.use(function (req, res, next) {
    console.log('Hello from middleware')
    next();
})




app.set("view engine", "ejs");
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('index', { name: 'Dude' })
})

app.get('/price', function (req, res) {
    res.render('price')
})

app.get('/error', function (req, res) {
    throw Error('Something went wrong')
})

app.get('/:username', function (req, res) {
    res.send(`Hello ${req.params.username}`)
})

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})

app.listen(3000)