# Gun


# Config:

Gun({secure: true})  which will revert back to the current private-only version.

# Peers urls
```javascript
var gun = Gun(['peer 1 url/gun','peer 2 url/gun']);
```

# Init connection to peers
```javascript
var gun = Gun(url);
waitForEverythingtoLoad(function(){ // setTimeout
  gun.get('yaycakes').once(function(){});
});
```

# Init connect to peers
```javascript
var gun = Gun(url);

$("#clickMeIfYouAreBored").on('click', async function(){
  var funnyJoke = await gun.get('some').get('joke').then();
  alert(funnyJoke);
});
```

# Disconnect from peer
```javascript
var gun = Gun(); 
gun.on('bye', function(peer){ 
  console.log('disconnected from', peer) 
});
//'bye' gets triggered when the connectiong gets closed
```


# Manual Disconnect
```javascript
var peers = gun.back('opt.peers'); 
peers['http://localhost:8080/gun'].wire.close()
clearTimeout(peer.defer); //clear timer
```

# Gun Disconnect
```javascript
let peers = this.$root.$gun.back('opt.peers');//get list of peers.
peers['http://localhost:8080/gun'].wire.close(); //close connection
peers['http://localhost:8080/gun'].url = null; //null for delete
clearTimeout(peers['http://localhost:8080/gun'].defer); //clear loop
```

# Gun Connect to peer
```javascript
gun.on('hi', peer => {
  console.log(peer);
});
```
