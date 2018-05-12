# Private Message

# Information:
 Simple example private message by using sea.js and pair keys to setup set and get message from alias users.

# notes:
 * You need to create user alias account to make gun.user() to work from SEA.js script.

# Encrypt Example:
```javascript
async function(){//note you need this to sync with await to work for get 
    let user = gun.user();
    this.sendersubject = 'test';
    this.sendercontent = 'test';
    this.pubkey = 'id';
    var messagedata ={
        from:user.is.alias,
        subject:this.sendersubject,
        content:this.sendercontent,
    };
    let what = messagedata;
	if(!what){ return }
    var pub = (this.pubkey || '').trim();
    if(!pub) {return}
    //get alias data
    var who = await gun.user(pub).then() || {};
    if(!who.alias){ return }
    //set alias secret key
    var sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
    //encrypt alias message
    var enc = await Gun.SEA.encrypt(what, sec);
}
```

# Decrypt Example:
```javascript
async function(){//note you need this to sync with await to work for get variable.
    let user = gun.user();
    //this.pubkey 
    let pub = (this.pubkey || '').trim();
    if(!pub){ return }//do not run next just exit function
    let to = gun.user(pub);//get alias from public key
    let who = await to.then() || {};//get alias data
    this.pubkeystatus = who.alias || "User not found.";
    if(!who.alias){ return } //do not run next just exit function
    let dec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
    //get data is crypt
    gun.get('key').once((say,id)=>{
        say = await Gun.SEA.decrypt(say,dec);
        console.log('message:',say);
    });
}
```