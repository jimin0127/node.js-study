//2. for-in ( 배열, 객체 둘 다 사용가능)
let user = ['kim', 'lee', 'park']
for(let i in user) {//i : index
    console.log(i, user[i])
}

const obj = { //key - value로 이루어짐
    name: 'kang', 
    age:30
}

for(let i in obj){
    console.log(i, obj[i])
}

//3. for-of(배열, 객체 둘 다 사용 가능 )
const user2 = ['kim2', 'lee2', 'park2']
for(let i of user2){
    console.log(i)
}
const str = "hi javascript";
for(let value of str){
    console.log(value)
}

//4. forEach() 배열의 함수, 객체에서는 사용할 수 없음
let user3 = ['kim3', 'lee3', 'park3']
user3.forEach(function(val, index) {
    console.log(val, index);
})