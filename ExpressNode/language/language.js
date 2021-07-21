const express = require('express')
const app = express()
const fs = require('fs');
const multer = require('multer');
const { render } = require('pug');

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))



app.get("/lang", (req, res) => {
    fs.readdir('./files', (err, files) => {
        if(err){
            console.log(err);
        }else {
            res.render('lang', {files: files});
        }
        
    })
})

app.get("/lang/:id", (req, res)=>{
    fs.readFile(`files/${req.params.id}`, 'utf-8', (err, result) => {
        if(err) {
            console.log(err);
        }else {
            fs.readdir('./files', (err, files) => {
                if(err){
                    console.log(err);
                }else {
                    res.render('lang', {files: files,title: req.params.id, description: result});
                }
                
            })
        }
    })
})

app.post("/lang", (req, res) => {
    fs.writeFile(`./files/${req.body.title}`, req.body.description, 'utf-8', (err) => {
        if(err) {
            console.log(err);
        }else {
            res.redirect('lang');
        }
    })
})

app.get("/", (req, res) => {
    res.send("hi pug!")
})


app.listen(3000, () => {
    console.log('listen...')
})