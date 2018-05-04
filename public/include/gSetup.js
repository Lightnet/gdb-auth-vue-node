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
        function gput(request){
            console.log('gput');
            console.log(request);
            
            if(request.put){
                //console.log(request);
                for(let o in request.put ){
                    let po = request.put[o];                    
                    let ap = {};
                    for(let v in po){
                        if(v != '_'){
                            ap[v] = po[v];
                        }
                        //console.log('var >> ',v);
                    }
                    if(window.g){
                        //console.log("insert?");
                        //console.log(request.put[o]);
                        window.g.get(o).put(ap);
                        window.renderGraph();
                    }
                }
            }
            
            return this.to.next(request);
        }

        //var gunl = Gun('http://127.0.0.1:8080'+ '/gun');
        var gunl = Gun(location.origin + '/gun');
        gunl.on('put', gput);
        gunl.get('data').once(()=>{}); //init connnect
        
        //window.g = Gun(); // volatile demo
        //window.g = Gun(location.origin + '/gun'); // sync with server peer
        window.g = Gun(); // instance
        //window.g.get('data').put('alert(1)');
        window.g.get('data').once(function(){});
        console.log("default!",location.origin);
    }
}
