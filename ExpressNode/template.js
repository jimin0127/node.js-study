const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.send("hi pug!")
})


app.listen(3000, () => {
    console.log('listen...')
})