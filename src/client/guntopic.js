/*
  Information: This partly babel es6 script code.
 */


//https://gun.eco/docs/Adding-Methods-to-the-Gun-Chain

export class Topic{
    constructor(){

    }

    async create(){

    }

    async build(){
        const gunRoot = this.back(-1)
        console.log("build here?!");
        //return;
    }

}
//var TOPIC = new Topic();
Gun.chain.topic = function(arg) {
    //console.log("chain topic");
    const gunRoot = this.back(-1)  // always reference the root gun instance.
    const topic = gunRoot._.topic || (gunRoot._.topic = gunRoot.chain()); // create a user context.
    [
    'create',
    'build',
    'createtoken',

    //].map((method)=>topic[method] = TOPIC[method]);
    ].map((method)=>topic[method] = new Topic()[method]);
    return topic // return the user!
}

