
module.exports = (conn, upload) => {
    const router = require('express').Router();
    const format = require('date-format')
    const moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul")
    const sql = require('../db/sql')

    const date = moment().format('YYYY-MM-DD HH:mm:ss')

    router.get("/", (req, res) => {
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

    router.get('/login', (req, res) => {
        res.render('login-form');
    })

    router.post('/login', (req, res) => {
        const _user_id = req.body.user_id;
        const _passwd = req.body.passwd;
        conn.query(sql.user_read, [_user_id], (err, row) => {
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

    router.get('/read/:id', (req, res)=> {
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

    router.get('/write', (req, res) => {
        if(req.session.uid){
            res.render('write', {user: req.session.uid});
        }else { 
            res.send("<script>alert('로그인이 필요합니다!'); window.location=\"../\"</script>")
        }
    })

    router.post('/write', upload.single('userfile'), (req, res) => {
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

    router.get('/edit/:id', (req, res) => {
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

    router.put('/edit/:id', (req, res) => {
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

    router.get('/delete/:id', (req, res) => {
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

    router.post('/search', (req, res) => {
        const type= req.body.type;
        console.log(type)
        const value = req.body.value;
        console.log(`${sql.search_ + type}`)
        conn.query(sql.search,[`%${value}%`, `%${value}%`, `%${value}%`],(err, rows)=>{
            if(err) {
                console.log(err);
            }else {
                console.log(rows);
                if(rows.length == 0){
                    res.send("<script>alert('검색 결과가 없습니다. '); window.location=\"../\"</script>")
                }else {
                    res.render('result', {rows : rows})

                }
            }
        }) 
    })

    router.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            }else {
                res.send("<script>alert('로그아웃!'); window.location=\"../\"</script>")
            }
        })
    })

    router.get("/signup", (req, res) => {
        res.render('signup-form');
    })

    router.post("/signup", (req, res) => {
        const _user_id = req.body.user_id;
        const _passwd = req.body.passwd;
        const _email = req.body.email;
        const _tel = req.body.tel;
        const _reg_date = date;
        conn.query(sql.user_insert, [_user_id, _passwd, _email, _tel, _reg_date], (err) => {
            if(err) {
                console.log(err);
            }else {
                res.send("<script>alert('회원가입!'); window.location=\"../\"</script>")
            }
        })
    })

    router.get('/down/uploads/img/:name', (req, res) => {
        const filename = req.params.name;
        const file = '.\\uploads\\img\\' + filename;
        console.log('file', file);
        res.download(file);
    })

return router;   
}