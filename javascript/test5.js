// 1. 객체 첫번째 생성 방법
const user = {
    kim: 10, 
    lee: 7, 
    park: 25
}
console.log(user.kim);

// 2. new 연산자 이용한 생성
const user2 = new Object();
//const user2 = {} {}는 객체를 생성하겠다. 선언 
// 객체이름.키 = 값, 객체이름[키] = 값. 
user.kim = 10;
user.lee = 25;
user['park'] = 9;


//3. 프로토타입 이용한 생성(자바의 클래스와 거의 비슷한 개념)
function Person(name, age) { //프로토타입 : 함수
    this.name = name;
    this.age = age;
}
Person.prototype.walk = function() {
    console.log("걷는다");
}

let person1 = new Person("kim", 30);
let person2 = new Person("lee", 20);
console.log(person1.name)
console.log(person2.name)
person2.walk();

//==================
//1. 
const score1 = {
    'kor' : 100,
    'eng' : 80,
    'math' : 90, 
    sum : function() {
        console.log(score1.kor + score1.eng + score1.math)
    }
}
score1.sum();


//2. 
let score2 = new Object();
score2.kor = 100;
score2.eng = 80;
score2.math = 90;
score2.sum = function() {
    console.log(score2.kor + score2.eng + score2.math);
}
score2.sum();

//3. 
function Score(kor, eng, math){
    this.kor = kor;
    this.eng = eng;
    this.math = math;
}
Score.prototype.sum = function() {
    console.log(this.kor + this.eng + this.math)
}
let score3 = new Score(100, 80, 90);
score3.sum();