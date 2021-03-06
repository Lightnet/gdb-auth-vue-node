# SEA (Security, Encryption, Authorization) API

# Links:
 * https://gun.eco/docs/SEA

# API functions:
 * SEA.sign(data, pair)
 * SEA.verify(data, pair)
 * SEA.encrypt(data, pair)
 * SEA.decrypt(data, pair)
 * SEA.work(data, pair)

```javascript
let n = 5;
Gun.text.random(n,'*');
//result
//*****
```

# Basics:
```javascript
;(async () => {
    var SEA = Gun.SEA;
    var pair = await SEA.pair();
    var enc = await SEA.encrypt('hello self', pair);
    var data = await SEA.sign(enc, pair);
    console.log(data);
})();

```

```javascript

async function Test(){
    var SEA = Gun.SEA;
    var pair = await SEA.pair();
    var enc = await SEA.encrypt('hello self', pair);
    var data = await SEA.sign(enc, pair);
    console.log(data);
}

Test();
```

Two example how to get sea.js to work. Read more on link.


# Notes:
 * You might need to setup sync for wait load variables.
 * Testing script here.

```javascript
this.$root.$gun.get('alias/'+this.aliasname).map().once(data=>{
    //console.log(data);
    //console.log(data.forgot['#']);
    if(data.forgot){
        let gunforgot = gun.get(data.forgot['#']);
        gunforgot.map().once(data2=>{
            //console.log(data2);
        })
        //console.log(gunforgot)
    }
});
```

```javascript
let gunalias = await this.$root.$gun.get('alias/'+this.aliasname).map().then() || {};
console.log(gunalias);
let q1 = await gun.get(gunalias.forgot['#']).get('q1').then() || '';
let q2 = await gun.get(gunalias.forgot['#']).get('q2').then() || '';
let hint = await gun.get(gunalias.forgot['#']).get('hint').then() || '';
//if((this.question1 == q1)&&(this.question2 == q2)){
    //this.hint = hint;
    //console.log('hint',hint);
//}else{
    //console.log('fail!',hint);
//}
//gun.get(gunalias.forgot['#']).once((data)=>{
    //console.log(data);
//});
//let forgot = await gun.get(gunalias.forgot['#']).map().then() || {};
//console.log(forgot);
//gun.get(gunalias.forgot['#']).map().once((data,id)=>{
    //console.log(data);
    //console.log(id);
//});
```

```javascript
let user = gun.user();
console.log(gun);

//user data is bind to this variable key
let room = user.get('room').put({name:'room'});
console.log(room);
//get current user to see variable for room
//set room and then generate id key that is current user
user.get('room').once((data)=>{
    console.log(data);
    console.log(data._['#']); //id key for using gun.get('jh4wa2x2~qjbFKQnhE0gSsO9ylW-0AlEfcf9MZ2AUc0HnO__7Jzg.5XrlD8CuBE1Brr6Pju4a5Fe2eQqzhp4uKNlWZErpNeA')
});
//get user from room id from current user and not other user rooms.
gun.get('jh4wa2x2~qjbFKQnhE0gSsO9ylW-0AlEfcf9MZ2AUc0HnO__7Jzg.5XrlD8CuBE1Brr6Pju4a5Fe2eQqzhp4uKNlWZErpNeA').once((data)=>{
    console.log(data);
});
//set data for user create is current own this id room as other users can't write this.
gun.get('jh4wa2x2~qjbFKQnhE0gSsO9ylW-0AlEfcf9MZ2AUc0HnO__7Jzg.5XrlD8CuBE1Brr6Pju4a5Fe2eQqzhp4uKNlWZErpNeA').put({name:'test4'});
```
npm install node-webcrypto-ossl


# Links:
 * https://gist.github.com/amark/755193244d28f4f4c980130055a26e5c

 * http://jsbin.com/jenatavabe/edit?html,js,output Gun.text.random
 * http://jsbin.com/jenatavabe/2/edit?html,js,output