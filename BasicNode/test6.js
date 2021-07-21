//1. http 모듈을 가지고 와서 http에 대입한다. 
const http = require('http')

//2. 웹서버 객체 만들기 (서버 객체를 만들어서 server에 대입)
const server = http.createServer();

//3. 웹서버 실행해서 대기하기(사용자 요청 기다리기)
server.listen(3000, () => {
    console.log('Running Http Server at localhost...');
})