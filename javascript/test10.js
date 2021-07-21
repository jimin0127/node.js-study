/*
function callTimes(callback) {
    for(var i = 0; i<5; i++) {
        callback();
    }
}
*/

// 콜백 함수를 5번 호출하기
let callTimes = (callback) => {
    for(var i = 0; i<5; i++) {
        callback();
    }
}

let testB = () => {
    console.log('testB() 함수');
}

// callTimes(testB);

callTimes(() => {
    console.log('testB() 함수');
})

console.log("========================")

let add = (a, b, cd) => {
    e = a + b
    cd(e);
    /*
    var k = (result) => {
        console.log(result);
    }
    */
}

var k = (result) => {
    console.log(result);
}

add(10, 20, k);

add(10, 20, (result) => {
    console.log(result);
})

console.log("============================")
fs.readFile("data.txt", function(err, result) {
    console.log(result);
})

// data.txt 파일을 읽고 다 읽은 후 error가 나면 err에 넣고 그 내용을 result에 넣기,
// 내용을 다 읽으면 콜백함수를 실행

fs.writeFile("test.txt", function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Saved!!');
}) // ...?
