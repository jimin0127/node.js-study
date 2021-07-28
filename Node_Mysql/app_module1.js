const express = require('express')
const app = express()
const mysql = require('mysql');
const format = require('date-format')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")

const indexRouter = require('./routes/index');

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

app.use('/', indexRouter) //사용자가 /를 포함하여 

app.listen(3000, () => {
    console.log('Running..');
})
