const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
// mongoClient 객체를 생성함. 

const url = "mongodb://localhost:27017"
const dbname = "data"

let db;

app.use(express.urlencoded({extended: true}))

MongoClient.connect(url, (err, client) => { //client : 우리가 mongodb와 소통하는 매개체 역할 
    if(err) {
        console.log(err);
    }else {
        console.log('Connected mongodb');
        db = client.db(dbname); // db : datas
        login = db.collection('login');
        console.log('created!');
    }
})

app.get("/", (req, res) => {
    res.send("hi")
})

app.listen(3000, () => {
    console.log('listen...')
})