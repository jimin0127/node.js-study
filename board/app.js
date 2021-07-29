const express = require('express')
const multer = require('multer');
const mysql = require('mysql');
const session = require('express-session');
const methodOverride = require('method-override');

const format = require('date-format')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")
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
const date = moment().format('YYYY-MM-DD HH:mm:ss')

app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}))

const conn = mysql.createConnection(config);

conn.connect();

//2. 쿼리를 객체로 생성
const sql = {
    list: 'select * from board order by id',
    insert: 'insert into board(title, name, content, regdate, modidate, passwd, hit, file_name, file_path) values(?, ?, ?, ?, ?, ?, ?,?, ?)', 
    read: 'select * from board where id = ?', 
    hit : 'update board set hit = ? where id = ?',
    update: 'update board set title=?, content = ?, modidate=? where id=?', 
    delete: 'delete from board where id=?', 
    search : "select * from board where ? like ?"   
}
const user_sql = {
    insert: 'insert into user(user_id, passwd, email, tel, reg_date) values(?, ?, ?, ?, ?)', 
    read: 'select * from user where user_id = ?', 
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
    conn.query(sql.list, [], (err, rows) =>{
        if(err) {
            console.log(err);
        }else {
            if(req.session.uid){
                res.render('index', {rows :rows, user: req.session.uid});
            }else { 
                res.render('index', {rows: rows, user: null});
            } 
        }
    })


    
})



app.get('/login', (req, res) => {
    res.render('login-form');
})

app.post('/login', (req, res) => {
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;
    conn.query(user_sql.read, [_user_id], (err, row) => {
        if(err) {
            console.log(err);
        }else {
            if(row[0].passwd == _passwd) {
                req.session.uid = row[0].user_id;
                req.session.save(() => {
                    res.send("<script>alert('로그인!'); window.location=\"../\"</script>")
                })
            }else {
                res.send("<script>alert('정보가 틀렸습니다.'); window.location=\"../\"</script>")

            }
        }
    })
})

app.get('/read/:id', (req, res)=> {
    const _id = req.params.id;
    if(req.session.uid){
    }else { 
        res.send("<script>alert('로그인이 필요합니다!'); window.location=\"../\"</script>")
    }
    
    conn.query(sql.read, [_id], (err, row) => {
        if(err) {
            console.log(err);
        }else {
            conn.query(sql.hit, [row[0].hit + 1, _id], (err) => {
                if(err) {
                    console.log(err);
                }else {
                    res.render('read', {row: row[0]})

                }
            })
        }
    })
})

app.get('/write', (req, res) => {
    if(req.session.uid){
        res.render('write', {user: req.session.uid});
    }else { 
        res.send("<script>alert('로그인이 필요합니다!'); window.location=\"../\"</script>")
    }
})

app.post('/write', upload.single('userfile'), (req, res) => {
    const _name = req.body.user_id;
    const _title = req.body.title;
    const _content = req.body.content;
    const _regdate = date;
    const _modidate = date;
    const _passwd = req.body.passwd;
    const _hit = 0;
    const _filename = req.file.originalname;
    const _filepath = req.file.path;

    conn.query(sql.insert, [_title, _name, _content, _regdate, _modidate, _passwd, _hit, _filename, _filepath],
        (err) => {
            if(err) {
                console.log(err);
            }else {
                res.redirect('/');
            }
        })
})

app.get('/edit/:id', (req, res) => {
    conn.query(sql.read, [req.params.id], (err, row)=> {
        if(err) {
            console.log(err);
        } else {
            if(req.session.uid == row[0].name){
                res.render('edit', {row: row[0]});
            }else {
                res.send("<script>alert('작성자만 수정할 수 있습니다. '); window.location=\"../\"</script>")
            }
        }
    })
})

app.put('/edit/:id', (req, res) => {
    const _title = req.body.title;
    const _content = req.body.content;
    const _modidate = date;
    const _id = req.params.id;
    conn.query(sql.update, [_title, _content, _modidate, _id], (err) => {
        if(err) {
            console.log(err)
        }else {
            res.redirect(`/read/${_id}`)
        }
    })
})

app.get('/delete/:id', (req, res) => {
    const _id = req.params.id;
    conn.query(sql.read, [_id], (err, row)=> {
        if(err) {
            console.log(err);
        } else {
            if(req.session.uid == row[0].name){
               conn.query(sql.delete, [_id], (err) => {
                   if(err) {
                       console.log(err);
                   }else {
                       res.redirect('/');
                   }
               })
            }else {
                res.send("<script>alert('작성자만 삭제할 수 있습니다. '); window.location=\"../\"</script>")
            }
        }
    })
})

app.post('/search', (req, res) => {
    const type= req.body.type;
    console.log(type)
    const value = req.body.value;
    console.log(value)
    conn.query(sql.search,[type, '%'+value+'%'],(err, rows)=>{
        if(err) {
            console.log(err);
        }else {
            if(rows.length == 0){
                res.send("<script>alert('검색 결과가 없습니다. '); window.location=\"../\"</script>")
            }else {
                res.render('result', {rows : rows})

            }
        }
    }) 
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }else {
            res.send("<script>alert('로그아웃!'); window.location=\"../\"</script>")
        }
    })
})

app.get("/signup", (req, res) => {
    res.render('signup-form');
})

app.post("/signup", (req, res) => {
    const _user_id = req.body.user_id;
    const _passwd = req.body.passwd;
    const _email = req.body.email;
    const _tel = req.body.tel;
    const _reg_date = date;
    conn.query(user_sql.insert, [_user_id, _passwd, _email, _tel, _reg_date], (err) => {
        if(err) {
            console.log(err);
        }else {
            res.send("<script>alert('회원가입!'); window.location=\"../\"</script>")
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