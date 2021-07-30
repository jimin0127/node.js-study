const express = require('express')
const app = express()
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/'));

app.use(methodOverride('_method'))


app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

const indexRouter = require('./routes/index')();
app.use('/', indexRouter);

app.listen(3000, ()=> {
    console.log('listen...');
})