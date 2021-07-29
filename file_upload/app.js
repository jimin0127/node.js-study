const express = require('express')
const multer = require('multer');
const mysql = require('mysql');


const app = express()

//app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

//1. mysql 연동
const conn = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password: '1234',
    database: 'nodejs_study', 
    port: 3306,
})
conn.connect();

//2. 쿼리를 객체로 생성
const sql = {
    list: 'select * from file_upload order by id',
    insert: 'insert into file_upload(file_name) values(?)', 
    read: 'select * from file_upload where id = ?', 
    update: 'update file_upload set name=?, emp_number=?, email = ? where id=?', 
    delete: 'delete from file_upload where id=?'
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
    conn.query(sql.insert, [req.file.path], (err) => {
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
            res.render('show', {rows: rows});
        }
    })
})


app.get('/down/uploads/texts/:name', (req, res) => {
    const filename = req.params.name;
    const file = __dirname + '\\uploads\\texts\\' + filename;
    console.log('file', file);
    res.download(file);
})

app.listen(3000, () => {
    console.log('listen...')
})