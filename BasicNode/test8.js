//웹서버 만들기(4줄짜리)
const http = require('http')
const server = http.createServer()
server.listen(3000, () => {
    console.log('listen..');
})

const fs = require('fs')
//사용자 요청 이벤트 처리 
//1. 서버에 lion1.png 출력
//2. readFile tkdyd
//3 . content-type : image/png
server.on('connection', (socket) => { //socket : 접속한 사용자 정보가 들어있는 객체
    console.log('사용자가 접속했습니다. ');
})

server.on('request', (req,res) => {
    fs.readFile('./lion1.png', (err, result) => {
        if(err) {
            console.log(err)
        }else{
            res.writeHead(200, {"Content-Type": "image/png"})
            res.write(result);
            res.end();
        }
    })
})