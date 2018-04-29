# Guide

This is work in progress prototype project build.

This project has fews simple examples for how sea.js auth and gun js database works. Todolist and private message text are simple examples to test how gun.js work in database graph style. User can create their accounts but not email since it peer to peer network database. User can't not over ride other users data auth access or information.

To build decentralized forum is not an easy task. Since there are pros and cons to them.

# Notes:
 * babel-polyfill is needed for async function to work.
 * To create forget password is to develop sercet key back up that has not be writen.

# Information:
 This project build up gun.js for peer to peer realtime decentralized database. By using Vue.js as frontend framework for user interface. Frontend is web page view render. You can read more to the [vuejs](https://vuejs.org/). Gun.js can run client and server side database since it only using data format from nodejs data string file and browser built in storage database. You can read more about it from site. [Gun.js](https://github.com/amark/gun)

# Vue.js and gun.js setup:
 Vue.js is web page render help develop gun.js to access database in javascript language quickly with out needed to add more codes. But depend how well it coded. Vue is module components base. You can think of an node tree. There is root access or parent variable to able to used gun.js variable to access.

 Here simple example setup.

``` 
//src/client/clientEntryPoint.js //entry point browser
//babel javascript
import Vue from 'vue';
Vue.config.productionTip = false
import VueGun from 'vue-gun';

var gun;
if(location.origin == 'http://localhost:3000'){
    gun = Gun('http://localhost:8080' + '/gun');
}else{
    gun = Gun(location.origin + '/gun');
}

Vue.use(VueGun, {
  gun: gun // must be passed in at `gun` key
});
//this is main root access
var app = new Vue({
    el: '#app',
    data: {
    },
    created:function(){
        this.user = this.$gun.user();
        console.log(this.user);
    }
});

```

Child for render.
```
<template>
</template>
<script>
//src/client/account-template.vue
export default {
    data() {
    },
    created(){
        //main root access for gun
        let gun = this.$root.$gun;
    }
}
</script>

<style lang="scss">
</style>
```

# Notes:
 * Vuejs is easy to understand once reading the site guide references.