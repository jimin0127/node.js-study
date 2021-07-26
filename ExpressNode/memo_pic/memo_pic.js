const express = require('express');
const fs = require('fs');
const multer = require('multer')
const app = express()


var storageA = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname)

    }
  })
   
  var upload = multer({ storage: storageA })


//app.use(express.static(__dirname + '/public'));
//app.use('/img', express.static('uploads'));


app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('memo_pic')
})

app.post('/memo', upload.single('userfile'), (req, res) => {
    let _name = req.body.name;
    let _date = req.body.date;
    let _content = req.body.content;

    fs.appendFile('memo.txt', `작성자 : ${_name} \n작성일자 : ${_date}\n내용:${_content}\n\n`, 
    (err) => {
        if(err) {
            console.log(err);
        }else {
            res.send(`${_name}이<br><img src="uploads/${req.file.originalname}">`);
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