//add라는 함수 만들고 3, 5를 넘겨서 더한 합 출력
function add1(x, y) {
    return x + y;
}

const add = function(a, b){
    return a + b;
}

console.log(add1(3, 5))
console.log(add(3, 5))

// 1. 익명함수 n부터 m부터 더한 합 출력
const nmadd = function(n, m) {
    var sum=0
    for (let i = n; i <=m ;i++) {
        sum += i;
    }
    return sum;
}
console.log(nmadd(1, 3));

// 2. n을 넘겨서 짝수인지 홀수인지 판단하여 출력
const func1 = function(n) {
    if (n % 2== 0) {
        return '짝수'
    }
    return '홀수'
}
console.log(func1(4))

//3. person 객체를 만들고 name: kim, age: 30, add: x, y 더한 값 리턴
let person = {
    name: 'kim', 
    age: 30, 
    add: function(x, y){
        return x + y;
    }
}
console.log(person.add(3, 5));

// 4. person2 객체 만들고 list: 객체 삽입(kim, 30 / lee, 28/ park, 35)
//show : 함수 (console.log(hi hello))
//person2의 함수 호출
let person2 = {
    list : {kim:30, lee:28, park:35},
    show: function() {
        console.log('hi hello');
    }
}

person2.show();
person2['show']();
