const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("hi pug!")
})

app.get("/cookie", (req, res) => {
    res.render('cookie_form');
})

app.post('/cookie', (req, res) => {
    let _uid = req.body.uid;
    res.cookie('userId', _uid);
    res.send('쿠기 설정 완료');
})

app.get("/result", (req, res) => {
    res.send(req.cookies.userId);
})

app.listen(3000, () => {
    console.log('listen...')
})