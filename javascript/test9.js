console.log('A');

/*
setTimeout(function() {
    console.log('C');
    console.log('D');
}, 0)
*/

// readFile('a.pdf') 100000000000G -> 3시간 걸림


// 동기: A a.pdf B : 차례차례
// 비동기: A B a.pdf : 백그라운드에서 a.pdf 읽는 동안 A B 찍히고 a.pdf


/*
setTimeout (() => {
    console.log('C');
    console.log('D');
}, 0)
// 0초가 지난후에 콜백함수를 실행
*/

console.log('B');

// A-B-C-D

readFile()  // 비동기
readFileSync(a.pdf) // 동기 -> a.pdf를 다 읽을 때까지 아무 일도 못함