const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
// mongoClient 객체를 생성함. 

const url = "mongodb://localhost:27017"
const dbname = "testMongo"

let db;

app.use(express.urlencoded({extended: true}))

MongoClient.connect(url, (err, client) => {
    if(err) {
        console.log(err);
    }else {
        console.log('Connected mongodb');
        db = client.db(dbname);
        login = db.collection('login');
        console.log('created!');
    }
})

app.get("/", (req, res) => {
    res.send("hi pug!")
})


app.listen(3000, () => {
    console.log('listen...')
})