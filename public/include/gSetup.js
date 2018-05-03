/*global Gun:false, console:false*/
// https://github.com/amark/gun/wiki/API-(v0.3.x)

function gSetup(withRemotePeer, killLocalStorage) {
    'use strict';

    window.p = function(v) { console.log(v); }; // prints to console

    if (killLocalStorage) {
        localStorage.clear(); // kinda evil, just to discard eventual presence of old demo data
    }

    if (withRemotePeer) {
        window.g = Gun(location.origin + '/gun'); // sync with server peer
        console.log("Remote!");
    }
    else {
        function security(msg){
            console.log('security');
            //console.log(msg);
            
            if(msg.put){
                console.log(msg);
                for(let o in msg.put ){
                    let po = msg.put[o];
                    
                    let ap = {};
                    for(let v in po){
                        if(v != '_'){
                            ap[v] = po[v];
                        }
                        console.log('var >> ',v);
                    }

                    if(window.g){
                        console.log("insert?");
                        console.log(msg.put[o]);
                        //delete msg.put[o]._;
                        //window.g.get(o).put(msg.put[o]);
                        window.g.get(o).put(ap);
                        window.renderGraph();
                    }
                }
            }
            return this.to.next(msg);
        }

        Gun.on('opt', function(at){
            //if(!at.token){ // only add SEA once per instance, on the "at" context.
                at.on('in', security, at); // now listen to all input data, acting as a firewall.
                //at.on('out', signature, at); // and output listeners, to encrypt outgoing data.
                //at.on('node', neach, at);
            //}
            this.to.next(at); // make sure to call the "next" middleware adapter.
        });
        
        //window.g = Gun(); // volatile demo
        window.g = Gun(location.origin + '/gun'); // sync with server peer
        console.log("default!",location.origin);
    }
}
