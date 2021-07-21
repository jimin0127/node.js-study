// arrow function (=>)
// * function이 없어짐

// 1. 함수 이름으로 만드는 방법     // 2. 익명함수( =>)
function add(x, y) {
    return x+y;
}

let add = (x, y) => {
    return x+y;
}

function sub() {
    console.log('test');
}

let sub = () => {
    console.log('test');
}

let a = 10;
let b = 20;
console.log("a="+a+"이고 "+"b="+b+"입니다.");
console.log(`a=${a}이고 b=${b}입니다.`)