const express = require('express')
const app = express()
const mysql = require('mysql');
const format = require('date-format')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res) => {
    res.send("hi mysql & ejs!")
})

app.get("/new", (req, res) => {
    res.render('new');
})


app.listen(3000, () => {
    console.log('listen...')
})