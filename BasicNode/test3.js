let myModule = {
    name:'kim',
    age: 35,
    about:function(){
        console.log(`나의 이름은 ${this.name}이고 
        나이는 ${this.age}입니다.`);
    }
}

module.exports = myModule;