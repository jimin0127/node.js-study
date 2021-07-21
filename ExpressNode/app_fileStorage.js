const express = require('express')
const multer = require('multer');

const app = express()

//app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

var storageA = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname + '-' + Date.now())

    }
  })
   
  var upload = multer({ storage: storageA })

app.get("/", (req, res) => {
    res.send("hi pug!")
})

app.get('/upload', (req, res) => {
    res.render('upload_form');
})

app.post('/upload', upload.single('userfile'), function(req, res) {
    //upload.single('name') 한개 파일 올릴때 
    //upload로 post 라우팅이 들어왔을때 req 객체에 file이란 속성을 자동으로 추가시켜주는 역할 
    //req.file
    console.log(req.file.originalname);
    res.send('파일이 업로드 되었습니다.')
})


app.listen(3000, () => {
    console.log('listen...')
})