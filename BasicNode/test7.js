const http = require('http');
const server = http.createServer()
server.listen(3000, () => {
    console.log('listen..');
})

//1. 사용자 접속 이벤트 처리
server.on('connection', (socket) => { //socket : 접속한 사용자 정보가 들어있는 객체
    console.log('사용자가 접속했습니다. ');
})

//2. 사용자 요청 이벤트 처리 
server.on('request', (req, res) => {
    console.log('사용자의 요청이 들어왔습니다. ');
    res.writeHead(200, {"Content-Type" : "text/html; charset = utf-8"});
    res.write("<html><head><body>");
    res.write("Hello Nodejs");
    res.write("</body></html>")
    res.end();
});