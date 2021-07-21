const express = require('express')
const app = express();

//static이라는 미들웨어를 사용해 public을 루트로 지정
// 루트는 /
//app.use(express.static('public')); 

// public이 루트가 된다. localhost:3000/public가 /
//app.use('public', express.static('public')); 

// 절대경로로 루트를 설정 / 
app.use(express.static(__dirname + '/public'));
console.log(__dirname);

app.listen(3000, () => {
    console.log('Running express server at localhost...');
})