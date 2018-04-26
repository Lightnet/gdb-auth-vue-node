// client-side js

localStorage.clear();

// run by the browser each time your view template referencing it is loaded
import Vue from 'vue';
Vue.config.productionTip = false
import VueGun from 'vue-gun';

//gun.js
import Gun from 'gun';
import 'gun/sea';

//localhost 8080 , proxy doesn't work for reason when 8080 > 3000
//var gun = Gun(location.origin + '/gun');


//Gun.on('opt', function(at){
  //console.log('opt...');
  //console.log(at);
  //this.to.next(at); 
//});

//Gun.on('secure', function(msg){
  //var yes;
  /* enforce some rules about data */
  /* requires wire-spec understanding */
  //if(yes){
      //this.to.next(msg); // call next middleware
  //}
  //console.log('secure');
  // NOT calling next middleware firewalls the data.
//});

//Gun.get('node').map().once(function(data){
  //console.log('data',data);
//});

//var gun = Gun('http://localhost:8080' + '/gun');
var gun = Gun(location.origin + '/gun');

//Gun.on('opt',function(data){
  //console.log("update:", data);
//});

//Gun.on(function(data){
  //console.log("update:", data);
//});
//https://stackoverflow.com/questions/49519571/gun-v0-9-92-using-sea-cant-put-nested-data-when-not-logged-in


console.log('data...');

//console.log(gun);
//window.onload = function() {
  //loginuser("test","test");
  //var user = gun.user();
  //user.create("test","test",function(ack){
    //console.log("created!", ack.pub);
  //});
  //user.auth("test", "test",function(ack){
    //console.log(ack);
    //if(ack.err){
      //console.log("fail!");
    //}else{
      //console.log("Authorized!");
    //}
  //});
//};
//https://github.com/sjones6/vue-gun
Vue.use(VueGun, {
  gun: gun // must be passed in at `gun` key
});
//Vue.use(VueGun, {
  //peers: ['someurl.com:9000/gun']
//});

//(function(){
    //console.log('hello world :o');
    //console.log('GunDB and Vue?');
    
    import bus from "./bus.js"; //var eventHub = new Vue();
    import App from "./App.vue";

    var app = new Vue({
		el: '#app',
      	//template:'<App/>',
      	render: h => h(App),
      	components: { App },
      	data: {
        blogin: false
    },
    created:function(){
        this.user = this.$gun.user();
        //console.log(this.user);
        bus.$on('event', this.handler);
        bus.$on('userlogin', this.handler_login);
        bus.$on('userlogout', this.handler_logout);
        bus.$on('usersiginup', this.usersiginup);
		//this.$on('event', this.clicktest);
		
		//this.handler_login({username:"test",passphrase:"test"});
    },
    //mounted: function() {
    	//console.log(this);
    //},
    methods: {
        handler_login(params){
        	//this.user = this.$gun.user();
          	//console.log(params);
          	//console.log(this);
          	//let blogin = false;
          	this.user.auth(params.username, params.passphrase,function(ack){
            	//console.log(ack);
            	if(ack.err){
              		console.log("fail!");
            	}else{
              		console.log("Authorized!");
              		bus.$emit('action','hidelogin');
				}
				//console.log("test?");
			});
			//console.log("test login?");
			//console.log(this.user);
          	//this.blogin = blogin;
          	//console.log(this.blogin);
        },
        usersiginup(params){
          	this.user.create(params.username, params.passphrase, function(ack){
				//console.log(ack);
				if(ack.err){
					console.log("fail!");
				}
				console.log("created!", ack.pub);
          	});
        },
        handler(params) {
          	console.log(params);
        },
        handler_logout:function(){
          	console.log("event logout");
            this.user.leave(function(ack){ 
			  console.log("ack",ack);
			  console.log("Logout Finish");
            });
            //console.log(this.user);
          	bus.$emit('action','logout');
			this.blogin = false;
			location.reload();
            //this.user = this.$gun.user();
        }
    },
    });

//})()