# Gun


# Config:

Gun({secure: true})  which will revert back to the current private-only version.

```
var gun = Gun(url);

waitForEverythingtoLoad(function(){ // setTimeout
  gun.get('yaycakes').once(function(){});
});
```
init connect to peers
```
var gun = Gun(url);

$("#clickMeIfYouAreBored").on('click', async function(){
  var funnyJoke = await gun.get('some').get('joke').then();
  alert(funnyJoke);
});
```
init connect to peers