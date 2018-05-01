/*
  Information: This partly babel es6 script code.
 */

//gun/sea/user.js
//https://gun.eco/docs/Adding-Methods-to-the-Gun-Chain
/*
topic
-permission/access
-token
-list forum
*/

export class Token{

    constructor(){

    }

    async create(key,cb){
        console.log("create");
        console.log(this);
        const gunRoot = this.back(-1);
        var gun = this, cat = (gun._);
        cb = cb || function(){};


        return gun;  // gun chain commands must return gun chains!
    }

    async build(){
        const gunRoot = this.back(-1)
        console.log("build here?!");
        //return;
        
    }

    async createkey(){
        //create token for user access

    }

    async verfiytoken(){

    }

}

Gun.chain.token = function(arg) {
    //console.log("chain topic");
    const gunRoot = this.back(-1)  // always reference the root gun instance.
    const topic = gunRoot._.topic || (gunRoot._.topic = gunRoot.chain()); // create a user context.
    [
    'create',
    'build',
    'createtoken',

    //].map((method)=>topic[method] = TOPIC[method]);
    ].map((method)=>token[method] = new Token()[method]);
    return token // return the user!
}

