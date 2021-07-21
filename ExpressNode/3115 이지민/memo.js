const express = require('express');
const fs = require('fs');
const app = express()

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('memo')
})

app.post('/memo', (req, res) => {
    let _name = req.body.name;
    let _date = req.body.date;
    let _content = req.body.content;
    fs.appendFile('memo.txt', `작성자 : ${_name} \n작성일자 : ${_date}\n내용:${_content}\n\n`, 
    (err) => {
        if(err) {
            console.log(err);
        }else {
            res.send('메모가 저장되었습니다.')
        }
    })
})

app.get('/view-memo', (req, res) => {
    fs.readFile('memo.txt','utf-8', (err, result) => {
        res.render('view-memo', {content: result});
    })
})

app.listen(3000, () => {
    console.log('listen...')
})