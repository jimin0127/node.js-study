//express
const express = require('express')
const app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.send("hi dynamic");
})

//2. /dynamic으로 접속했을때 hi dynamic2 출력
app.get("/dynamic", (req, res) => {
    //res.send("hi dynamic2");
    let list ='';
    for(let i = 0; i < 5; i++) {
        list = list + '<li>hello</li>'
    }
    let output=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <ul>
            ${list}
        </ul>    
    </body>
    </html> `;
    res.send(output);
})

app.listen(3000, () => {
    console.log('listen...')
})