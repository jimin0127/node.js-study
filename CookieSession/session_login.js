const express = require('express')
const app = express()
const session = require('express-session');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'asdjklfasdc', // sid를 브라우저에 저장할 때 랜덤하게 해주는 것
    resave: false, //사용자가 접속할때 마다 세션 아이디를 새로 발급하느냐 아니냐를 결정하는 것
    saveUninitialized: true, //사용자가 접속해서 세션을 사용전까지는 sid를 발급하지 말아라
  }))

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))

app.get("/welcome", (req, res) => {
    if(req.session.nickname){
        res.redirect('/result')
    }
    res.send('welcome <a href="login">Login</a>');
})

app.get("/login", (req, res) => {
    res.render('login_form');
})

app.post("/login", (req, res) => {
    if(req.body.uid == 'kim' && req.body.upw==1111) {
        req.session.nickname = 'mike';
        res.redirect('/result')
    }else {
        res.send('로그인이 맞지 않습니다. <a href="login">Login</a>')
    }
})
app.get('/result', function(req, res) {
    res.send(`hello ${req.session.nickname} <a href="logout">logout</a>"`);
})
app.get('/logout', function(req, res) {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('/welcome');
        }
    })
})
app.get("/", (req, res) => {
    res.redirect('/welcome');
})


app.listen(3000, () => {
    console.log('listen...')
})  