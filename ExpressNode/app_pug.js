const express = require('express')
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
//view를 사용하겠다. 사용하는 템플릿엔진은 views 폴더에 저장
app.set('view engine', 'pug');
//나는 view를 pug를 사용하겠다. 
app.locals.pretty = true;

// 응답할때 객체안에 깨체를 넣을 수 있도록 하겠다. 
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("hi pug!")
})

app.get("/template", (req, res) => {
    //template으로 접속했을때(localhost:3000/template), 
    //temp라는 pug 파일이 열리게
    res.render("temp");
})

app.get("/login", (req, res)=> {
    res.render("login_form");
})

app.post("/login", (req, res) => {
    let _uid = req.body.uid;
    let _upass = req.body.upw;
    if(_uid=='kim' && _upass == 1111){
        res.send("환영합니다.")
    }else {
        res.render('login_form');
    }
})

app.get('/temp', (req, res) => {
    let _id = req.query.name;
    let _pass = req.query.password;
    res.send(`이름은 ${_id}이고 비밀번호는 ${_pass}입니다. `)
})

app.listen(3000, () => {
    console.log('listen...')
})