const express = require('express')
const multer = require('multer');

const app = express()

const upload = multer({dest: 'uploads/'})

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.send("hi pug!")
})

app.get('/upload', (req, res) => {
    res.render('upload_form');
})

app.post('/upload', upload.array('userfile', 12), function(req, res) {
    //req객체에 files 속성 추가 
    console.log(req.files[0].originalname);
    res.send('파일이 업로드 되었습니다.')
})


app.listen(3000, () => {
    console.log('listen...')
})