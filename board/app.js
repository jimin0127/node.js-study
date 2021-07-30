const express = require('express')
const multer = require('multer');
const mysql = require('mysql');
const session = require('express-session');
const methodOverride = require('method-override');


const config = require('./db/dbconn');
const { query } = require('express');
const app = express()



app.use(session({
    secret: 'asdjklfasdc', 
    resave: false, 
    saveUninitialized: true, 
  }))


app.use(express.static(__dirname + '/'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}))

const conn = mysql.createConnection(config);

conn.connect();

var storageA = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype == "image/jpeg"|| file.mimetype=='image/png'){
            cb(null, 'uploads/img')
        }else {
            cb(null, 'uploads/texts')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

    }
  })
  var upload = multer({ storage: storageA })

  const indexRouter = require('./routes/index')(conn, upload);
  app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('listen...')
})