/*
 *
 */
//https://gun.eco/docs/Adding-Methods-to-the-Gun-Chain


Gun.chain.topic = function(arg) {
    //console.log("chain topic");
    const gunRoot = this.back(-1)  // always reference the root gun instance.
    const topic = gunRoot._.topic || (gunRoot._.topic = gunRoot.chain()); // create a user context.

    return topic // return the user!
}
