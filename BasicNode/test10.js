//express server 만들기 
const express = require('express')
const app = express();
//미들웨어use 사용
app.use((req, res, next) =>{
    //req : 요청객체, res : 응답객체, next : 다음 미들웨어 호출
    console.log("첫번째 미들웨어")
    req.user ='kim';
    next();
})
app.use((req, res)=> {
    //console.log("두번째 미들웨어");
    //res.send(`서버에서 응답한 결과 : ${req.user}`) //send는 한번만
    const person = {name: 'kim', age:35}
    const person2 = JSON.stringify(person); //JSON을 문자열 형식으로
    //문자열을 JSON 형식으로 : JSON.parse()
    res.send(person2)
})

app.listen(3000, ()=> {
    console.log('express server running');

})


