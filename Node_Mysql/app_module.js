const express = require('express')
const app = express()
const mysql = require('mysql');
const format = require('date-format')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")

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
    list: 'select * from emp order by id desc',
    insert: 'insert into emp(name, emp_number, email, reg_date) values(?, ?, ?, ?)', 
    read: 'select * from emp where id = ?', 
    update: 'update emp set name=?, emp_number=?, email = ? where id=?', 
    delete: 'delete from emp where id=?'
}


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', './views');

// 날짜 포맷 지정
const date = moment().format('YYYY-MM-DD HH:mm:ss')

//3. 목록보기 
app.get("/", (req, res) => {
    conn.query(sql.list, [], (err, rows) => {
        if(err) {
            console.log(err);
        }else {
            console.dir(rows);
            res.render('list', {lists: rows});
        }
    })
})

// 4. 데이터 추가 
app.get("/new", (req, res) => {
    res.render('new');
})

// 5. 내용보기 
app.get('/read/:id', (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, rows) => {
        if(err) {
            console.log(err)
        }else {
            console.log(rows);
            res.render('read', {title:'내용보기', rowsX: rows[0]})
        }
    })
})

app.get('/edit/:id', (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.read, [paramId], (err, row) => {
        if(err) {
            console.log(err);
        } else {
            console.log(row);
            res.render('edit_form', {rowsX: row[0]})
        }
    })
})

app.post("/edit/:id", (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.update, [req.body.name, req.body.emp_number, req.body.email, paramId], (err) => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('/');
        }
    })
})

app.get('/delete/:id', (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.delete, [paramId], (err) =>{
        if(err) {
            console.log(err);
        }else {
            res.redirect('/');
        }
    })
})

app.post("/new", (req, res) => {
    const _name=req.body.name;
    const _emp_number = req.body.emp_number;
    const _email = req.body.email;
    const _joinDate = date;

    conn.query(sql.insert, [_name, _emp_number, _email, _joinDate], (err) => {
        if(err) {
            console.log(err)
        }else {
            console.log("inserted");
            res.redirect('/');
        }
    })
})

app.listen(3000, () => {
    console.log('listen...')
})