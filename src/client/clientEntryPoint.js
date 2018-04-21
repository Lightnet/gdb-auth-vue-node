// client-side js
// run by the browser each time your view template referencing it is loaded
import Vue from 'vue';
import VueGun from 'vue-gun';



//import createTemplate from './create-template.vue';
//import manageTemplate from './manage-template.vue';
//import managePosts from './ManagePosts.vue';

//var gun = Gun('http://localhost:3000/gun');

//https://github.com/sjones6/vue-gun
//Vue.use(VueGun, {
  //gun: gun // must be passed in at `gun` key
//});

//Vue.use(VueGun, {
  //peers: ['someurl.com:9000/gun']
//});


Vue.component('manage-posts', {
  template: '#manage-template',
  data: function() {
    return {
      posts: [
        'Vue.js: The Basics',
        'Vue.js Components',
        'Server Side Rendering with Vue',
        //'Vue + Firebase'
      ]
    }
  }
});

Vue.component('create-post', {
  template: '#create-template'
});

//(function(){
    console.log('hello world :o');
    console.log('GunDB and Vue?');
    //var user = gun.user();

    //var eventHub = new Vue();
    //import App from './components/App.vue';
    import bus from "./bus.js";
    import App from "./App.vue";
    //import App from "./ToDoApp.vue";

    Vue.config.productionTip = false
    
    var app = new Vue({
      el: '#app',
      //template:'<App/>',
      //components: { App },
      render: h => h(App),
      //template:'<App/>',
      components: { App },
      
      data: {
        //currentView: 'manage-posts',
        //username:'',
        //userid:'',
        //user:'guest',
        //username: '',
        //passphrase:'',
        //loginpanel: true,
        //messagepanel: false,
        //say:'',
        //says:[]
      },
      //render: h => h(App),
      //components: { App },
      created:function(){
        console.log(this);
        bus.$on('event', this.clicktest);
        //this.$on('event', this.clicktest);
      },
      //mounted: function() {
        //console.log(this);
      //},
      methods: {
        handler(params) {
          console.log(params);
        },
        clicktest:function(){
          console.log("clicked!");
        }
        /*
        click_login:function(){
          console.log("click_login?");
          //this.loginpanel = false;
          console.log(this.username);
          console.log(this.passphrase);
          loginuser(this.username,this.passphrase);
        },
        click_signin:function(){
          console.log("click_signin?");
          createuser(this.username,this.passphrase);
        },
        click_speak:function(){
          console.log("click_speak");
          said(this.say);
        }
        */
      },
    });
    /*
    function createuser(username,passphrase){
      user.create(username, passphrase, function(ack){
        console.log("created!");
        console.log(ack);
        if(!ack.error){
          console.log("pass?");
        }
      });
    }

    function loginuser(username,passphrase){
      user.auth(username, passphrase,function(ack){
        //console.log(ack);
        if(ack.err){
          console.log("fail!");
        }else{
          console.log("Authorized!");
        }
      });
    }

    gun.on('auth', function(){
      app.loginpanel = false;
      app.messagepanel = true;
      user.get('said').map().val(UI);
    });

    function said(msg){
      if(!user.is){ return }
      user.get('said').set(msg);
      app.say = '';
    }

    function UI(say, id){
      //console.log(id,say);
      app.says.push({id:id,text:say})
    }
    */
    //create user from username alias and a password phrase
    //user.create("alice","forever",function(ack){
      //console.log("created!", ack.pub);
    //});
    /*
    user.auth("alice","forever",function(ack){
      console.log("Authorized");
      //gun.get("pub/" + ack.pub).put({hello:"world"});
      console.log(ack.pub);
      gun.get("pub/" + ack.pub).get('hello').val(function(val,key){
        console.log("READ:",val,key);
      });
    });
    */
    //var pubkey = 'NgjZ81TYCT1ueC6gCM8gvUkbMAxYlHw5LZ7cmmwMjns.P0B2p8JLGIaul9A0YyVW-TgQSFybWgn0TA6n1VNaImI';
    /*
    gun.get("pub/" + pubkey).get('hello').once(function(val,key){
        console.log("READ:",val,key);
      });
    */
    /*
    user.auth("test","test",function(ack){
      console.log("Authorized");
      //gun.get("pub/" + ack.pub).put({hello:"world"});
      console.log(ack);
      console.log(ack.pub);
      gun.get("pub/" + pubkey).get('hello').once(function(val,key){
        console.log("READ:",val,key);
      });
    });
    */  
//})()