const express = require('express')
const mongoose = require('mongoose');

const app = express()

app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/data', 
                {userNewUrlParser:true});

const db = mongoose.connection;


app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

db.on('err', () => {
    console.log('connection failed');
})

db.once('open', () => {
    console.log('connected');
})

//4. 스키마 생성
const login = mongoose.Schema({
    id: String,
    name: String, 
    email : String, 
    passwd : String
})

//5. 4번의 스키마를 토대로 하여 실제 컬렉션 생성
const Login = mongoose.model('login', login);
const person = new Login({id: '111', name:'jimin', email:'eakld@jfa', passwd:'1111'})
person.save((err, data) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('Saved!!!');
    }
})

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/list", (req, res) => {
    Login.find({}, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.render('list', {list: result})
        }
    })
})

app.get("/new", (req, res) => {
    res.render("new");
});
  
app.post("/new", (req, res) => {
    const _id = req.body.id;
    const _name = req.body.name;
    const _pwd = req.body.passwd;
    const _email = req.body.email;
    new Login({ id: _id, name: _name, passwd: _pwd, email: _email }).save(
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved!!!");
        }
      }
    );
    res.send("가입되었습니다.");
});

app.get("/edit/:id", (req, res) => {
    Login.findOne({id: req.params.id}, (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('edit', {person: result})
        }
    })
})

app.post("/edit/:id", (req, res) => {
    Login.updateOne({id: req.params.id}, 
        {id : req.body.id, name: req.body.name, email: req.body.email, passwd: req.body.passwd}, (err)=> {
            if(err) {
                console.log(err)
            }
            else {
                res.redirect('/list')
            }
        })
})



app.get("/delete/:id", (req, res) => {
    Login.deleteOne({id: req.params.id}, (err) => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('/list')
        }
    })
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.post("/login", (req, res) => {
    Login.findOne({id: req.body.id, passwd : req.body.passwd}, (err, result) => {
        if(err) {
            console.log(err);
        }
        else if(result == null) {
            res.redirect('login')
        } else {
            res.redirect('/')
        }
    })
})

app.listen(3000, () => {
    console.log('listen...')
})
