//파일 처리를 하려면 fs 모듈이 필요함
const _fs = require('fs');
_fs.readFile('./data.txt', 'utf-8', (err, result) => {
    console.log(result);
})

_fs.writeFile('write.txt', 'nodejs is server side javascript', 'utf-8', (err) => {
    if (err) {
        console.log(err);
    }else {
        console.log('Saved!');
    }
});