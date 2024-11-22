class Person{
    constructor(name, age){
       this.name= name;
       this.age= age;
    }
    static test(){
      return 'Hello my class'
    }
   get info(){
        return `Name is ${this.name} and ${this.age} years old`
    }
    gender(param){
        this.param= param.toLowerCase()
    return `${this.param=='male'?'He':this.param=='female'?"She": 'Others'}`
    }
}
console.log(Person.test());
const p1= new Person("alifn", 25)
const p2= new Person("tanvir", 24)
// console.log(p1.gender("male"));

class Skill extends Person{
constructor(arg, name, age){
    super(name, age)

this.skill= [...arg]
}

get log(){
return `${this.gender('male')} skllied in ${this.skill}`
}
}

Person.prototype.proto= function(){
return 'proto is working...'
}

const skill= new Skill(['Node.js', 'Mysql', 'Git'])
console.log(skill.log);
console.log(skill.proto());



