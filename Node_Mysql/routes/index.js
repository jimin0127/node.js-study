const express = require('express')
const mysql = require('mysql');
const format = require('date-format')
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")

const router = express.Router(); // router 객체 생성
// 날짜 포맷 지정
const date = moment().format('YYYY-MM-DD HH:mm:ss')

//3. 목록보기 
router.get("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render('new');
})

// 5. 내용보기 
router.get('/read/:id', (req, res) => {
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

router.get('/edit/:id', (req, res) => {
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

router.post("/edit/:id", (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.update, [req.body.name, req.body.emp_number, req.body.email, paramId], (err) => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('/');
        }
    })
})

router.get('/delete/:id', (req, res) => {
    const paramId = req.params.id;
    conn.query(sql.delete, [paramId], (err) =>{
        if(err) {
            console.log(err);
        }else {
            res.redirect('/');
        }
    })
})

router.post("/new", (req, res) => {
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


module.exports = router;