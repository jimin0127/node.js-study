module.exports = () => {
    const Todo = require('../db/conn')()
    const router = require('express').Router();
    const format = require('date-format')
    const moment = require('moment');
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul")

    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    
    router.get('/', (req, res) => {
        Todo.find({complate : 0}, (err, result1)=> {
            if(err) {console.log(err)}
            else {
                Todo.find({complate: 1}, (err, result2) => {
                    if(err) {console.log(err);}
                    else {
                        res.render('index', {nlist: result1, list : result2});
                    }
                })
            }
        })  
    })

    router.get('/todo/:id', (req, res) => {
        const _id = req.params.id;
        Todo.find({_id : _id}, (err, result) => {
            if(err){console.log(err);}
            else {
                res.render('detail', {list: result[0], date: date});
            }
        })
    })


    router.post('/todo', (req, res) => {
        const _todo = req.body.value;
        new Todo({todo : _todo, createDate: date, content : [], complate: 0}).save(
            (err, data) => {
                if(err) {
                    console.log(err);
                }else {
                    console.log('save');
                    res.redirect('/');
                }
            }
        )
    })

    router.post('/content/:id', (req, res) => {
        const _id = req.params.id;
        const _content = req.body.value;
        Todo.updateOne({_id: _id}, {$push : {content: _content}}, (err) => {
            if(err) {console.log(err);}
            else {
                res.redirect(`/todo/${_id}`);
            }
        })
    })

    router.post('/deadline/:id', (req, res) => {
        const _id = req.params.id;
        const _deadline = req.body.date;
        console.log(_deadline);
        Todo.updateOne({_id: _id}, {deadline: _deadline}, (err) => {
            if(err) {console.log(err);}
            else {
                res.redirect(`/todo/${_id}`);
            }
        })
    })
    router.post('/complate/:id', (req, res) => {
        const _id = req.params.id;
        Todo.updateOne({_id:_id}, {complate: 1}, (err) => {
            if(err) {console.log(err)}
            else {
                res.redirect('/');
            }
        })
    })

    router.delete('/:id', (req, res) => {
        const _id = req.params.id;
        Todo.deleteOne({_id: _id}, (err) => {
            if(err) {console.log(err)}
            else {
                res.redirect('/');
            }
        })
    })
    return router
}