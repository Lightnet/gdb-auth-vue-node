# SEA (Security, Encryption, Authorization) API

# Links:
 * https://gun.eco/docs/SEA

# API functions:
 * SEA.sign(data, pair)
 * SEA.verify(data, pair)
 * SEA.encrypt(data, pair)
 * SEA.decrypt(data, pair)
 * SEA.work(data, pair)


# Notes:
 * Testing script here.

```
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

```
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