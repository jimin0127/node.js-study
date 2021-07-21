let calc = {};
//add 함수 속성으로 추가
calc.add = (a, b) => {
    return a + b;
}

//console.log(calc.add(2, 2));

//module export는 객체만 내보낼 수 있음
module.exports = calc;
