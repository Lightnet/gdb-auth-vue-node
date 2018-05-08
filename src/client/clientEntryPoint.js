// client-side js

localStorage.clear(); //clear database for gun

// run by the browser each time your view template referencing it is loaded
import Vue from 'vue';
Vue.config.productionTip = false

import Element from 'element-ui'; // ui components
import 'element-ui/lib/theme-chalk/index.css'; //css
//import './element-variables.scss'; //css

Vue.use(Element);

import VueGun from 'vue-gun';

//gun.js
import Gun from 'gun';
import 'gun/sea';

//custom chain gun.js
//import './forum/guntopic';
//import './guntoken/guntoken';
import 'gun/lib/path';
import 'gun/lib/load';
import 'gun/lib/open';
import 'gun/lib/then';
import 'gun/lib/unset';

var SEA = Gun.SEA;
window.SEA = SEA;
//console.log(SEA);

//;(async () => {
	//var SEA = Gun.SEA;
	//var pair = await SEA.pair();
	//console.log(pair);
//})();
/*
;(async () => {
	var SEA = Gun.SEA;
	var pair = await SEA.pair();
	var enc = await SEA.encrypt('hello self', pair);
	var data = await SEA.sign(enc, pair);
	console.log(data);
	var msg = await SEA.verify(data, pair);
	var dec = await SEA.decrypt(msg, pair);
	var proof = await SEA.work(dec, pair);
	var check = await SEA.work('hello self', pair);
	console.log(dec);
	console.log(proof === check);
	})();
	*/

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
var gun;
if(location.origin == 'http://localhost:3000'){
	gun = Gun({
		peers:['http://localhost:8080' + '/gun'],
		secure: false, //not added?
	});
	console.log('local gun.js');
}else{
	gun = Gun(location.origin + '/gun');
	console.log('host gun.js');
}
//console.log(peers);

//gun.on('hi', peer => {
	//console.log('connect peer to',peer);
//});

//gun.on('bye', function(peer){// peer disconnect.
	//console.log('disconnected from', peer);
//});

//console.log(gun);
//console.log(gun);
gun.get('data').put(function(){});//init connection

//gun.on('auth', function(at){
	//if('sign' === c.hash){ c.hash = '' }
	//as.route(c.hash || 'people');
	//console.log('auth');
//});

//gun.on('secure', function(at){
	//console.log('secure');
//});

//var c = window.c = {};
//c.hash = location.hash.slice(1);
//console.log("c.hash ",c.hash );

//Gun.on('opt',function(data){
	//console.log("update:", data);
//});

//https://stackoverflow.com/questions/49519571/gun-v0-9-92-using-sea-cant-put-nested-data-when-not-logged-in

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
			blogin: false,
			publickeypost:'',
		},
		created:function(){
			this.user = this.$gun.user();
			this.setup_gunsocket();
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
			setup_gunsocket(){
				this.$gun.on('hi', peer => {//peer connect
					console.log('connect peer to',peer);
					this.$message({message:'Connected!',type: 'success',duration:1000});
				});

				this.$gun.on('bye', (peer)=>{// peer disconnect
					console.log('disconnected from', peer);
					this.$message({message:'Disconnected!',type:'warning',duration:800});
				});
			},
			handler_login(params){
				//this.user = this.$gun.user();
				//console.log(params);
				//console.log(this);
				//let blogin = false;
				let self = this;

				this.user.auth(params.username, params.passphrase,function(ack){
					//console.log(ack);
					if(ack.err){
						//console.log("fail!");
						self.$message('Auth attempt failed!');
					}else{
						//console.log("Authorized!");
						self.$message({message:'Authorized!',type: 'success',duration:800});
						bus.$emit('action','hidelogin');
				}
				//console.log("test?");
				});
			},
			usersiginup(params){
				let self = this;
				this.user.create(params.username, params.passphrase, function(ack){
					//console.log(ack);
					if(ack.err){
						//console.log("fail!");
						self.$message({message:ack.err ,type: 'warning',duration:2000});
					}
					if(ack.pub){
						//console.log("created!", ack.pub);
						self.$message({message:'Alias Created: ' + params.username +'!',type: 'success',duration:2000});
					}
				});
			},
			handler(params) {
				//console.log(params);
			},
			handler_logout:function(){
				let self = this;
				//console.log("event logout");
				this.user.leave(function(ack){ 
					//console.log("ack",ack);
					//console.log("Logout Finish");
					self.$message('Auth attempt failed!');
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