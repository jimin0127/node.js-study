const express = require('express')
const mongoose = require('mongoose');

//1. 접속 주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', 
                {userNewUrlParser:true});

//2. db 연결
const db = mongoose.connection;

//3. event 이용하여 접속
db.on('err', () => {
    console.log('connection failed');
})

db.once('open', () => {
    console.log('connected');
})

const app = express()

app.use(express.urlencoded({extended: true}))

//4. 스키마 생성
const test = mongoose.Schema({
    name: String, 
    age: Number
})

//5. 4번의 스키마를 토대로 하여 실제 컬렉션 생성
const Test = mongoose.model('aa', test);
//test라는 스키마를 사용해서 aa라는 테이블을 만듦. aa를 Test가 가리키게 함. 
// 몽고디비에 저장되는 컬렉션 이름은 항상 복수형임(aas)

app.get("/", (req, res) => {
    res.send("hi pug!")
})

//1) insert - 데이터 저장(new로 객체 생성해서 save() 메서드 이용 => insertOne)
// 한개 데이터 저장
// const person = new Test({name: 'park', age:40})
// person.save((err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log('Saved!!!');
//     }
// })

//2) insertMany 사용
// Test.insertMany([{
//     name: 'jimin', 
//     age:19
// }, {
//     name: 'ko', 
//     age: 70
// }, {
//     name: 'min', 
//     age: 15
// }], (err, result) => {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

//3) 전체 데이터 가지고 오기
// Test.find({}, (err, result) => {
//     if(err) {
//         console.log(err);
//     }else {
//         result.forEach((ele) => {
//             console.log(ele.name, ele.age);
//         })
//     }
// })

// 4) 특징 값 가져오기 
// Test.findOne({_id:"60fe3770c03b887234759538"}, (err, result) => {
//     if(err) {console.log(err)}
//     else {console.log(result)}
// })

// 5) 값 수정하기 
// Test.updateOne({_id: "60fe3770c03b887234759538"}, {name: 'ho'}, (err) => {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log('Updated!')
//     }
// })

// 6) 특정 값 수정하기 2
// 이름이 park인 애의 나이를 100, 이름을 park3로 변경시켜 $set 이용
// Test.updateOne({name:'park'}, {$set: {name: 'park3', age: 100}}, (err, result) => {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log(result);
//     }
// })

// 7) 삭제 deleteOne, deleteMany
//Test.deleteOne({조건})
Test.deleteOne({name: 'kim', age: {$lte: 35}}, (err) => {
    if(err) {
        console.log(err);
    }else {
        console.log('삭제 완료');
    }
})

app.listen(3000, () => {
    console.log('listen...')
})
