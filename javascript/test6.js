// user 배열 3 개의 객체
let users = [
    {'name':'kim','age' : 30}, 
    {'name':'lee', 'age': 25}, 
    {'name':'park', 'age':27}
]

//2. name:kang, age:35를 맨 뒤에 추가하고 배열의 길이 출력
users.push({'name':'kang', 'age':35})
console.log(users.length);

//3. 맨뒤의 데이터를 빼내고 배열의 길이 출력
console.log(users.pop())
console.log(users.length)

console.log(4)
//4. 맨 앞에 name:ko, age:40 추가하고 배열의길이 출력
users.shift({'name': 'ko', 'age': 40})
console.log(users.length)

console.log()
console.log(5)
//5. 맨 앞의 데이터 빼내고 배열의 길이 출력
console.log(users.unshift())
console.log(users.length);

console.log()
console.log(6)
// 6. 2번째 데이터 삭제
delete users[1]
console.log(users.length);

//7. forEach 이용해서 값 출력
users.forEach((val, index) => {
    console.log(val.age, val.name)
})