const express = require('express')
const multer = require('multer');
const mysql = require('mysql');
const config = require('./db/dbconn');

const app = express()

app.use(express.static(__dirname + '/'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

const conn = mysql.createConnection(config);

conn.connect();

//2. 쿼리를 객체로 생성
const sql = {
    list: 'select * from img order by id',
    insert: 'insert into img(filename, originalname) values(?, ?)', 
    read: 'select * from img where id = ?', 
    update: 'update img', 
    delete: 'delete from img where id=?'
}


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

app.get("/", (req, res) => {
    res.render('index');
})

app.get('/upload', (req, res) => {
    res.render('upload_form');
})

app.post('/upload', upload.single('userfile'), function(req, res) {
    conn.query(sql.insert, [req.file.path, req.file.originalname], (err) => {
        if(err) {
            console.log(err);
        }else {
            console.log('입력');
        }
    })
    console.log(req.file.originalname);
    res.send('파일이 업로드 되었습니다.')
})

app.get('/show', (req, res) => {
    conn.query(sql.list, [], (err, rows) => {
        if(err) {
            console.log(err);
        }else {
            console.log(rows[0].filename)
            res.render('show', {rows: rows});
        }
    })
})


app.get('/down/uploads/img/:name', (req, res) => {
    const filename = req.params.name;
    const file = __dirname + '\\uploads\\img\\' + filename;
    console.log('file', file);
    res.download(file);
})

app.listen(3000, () => {
    console.log('listen...')
})