// client-side js
localStorage.clear(); //clear database for gun
console.log("Client Main Entry Point");

// run by the browser each time your view template referencing it is loaded
import Vue from 'vue';
Vue.config.productionTip = false

import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
Vue.use(Buefy);

import VueGun from 'vue-gun';
//gun.js
import Gun from 'gun/gun';
//lib gun.js
import 'gun/nts';
//import 'gun/lib/time';

import 'gun/sea';

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

console.log(gun);
//gun.get('@').time((data, key, time)=>{ // subscribe to all incoming posts
	//console.log(data);
    // data might be a soul that you have to GET, I haven't made `time` be chainable yet
//}, 99); // grab the last 99 items

gun.on('hi', peer => {
	console.log('connect peer to',peer);
});
gun.on('bye', function(peer){// peer disconnect.
	console.log('disconnected from', peer);
});
//gun.get('data').once(function(){});//init connection
//https://stackoverflow.com/questions/49519571/gun-v0-9-92-using-sea-cant-put-nested-data-when-not-logged-in
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
			forumdata:[],
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
					this.$toast.open({
						message: 'Connected!',
						type: 'is-success'
					});
				});
				this.$gun.on('bye', (peer)=>{// peer disconnect
					console.log('disconnected from', peer);
					this.$toast.open({
						message: 'Disconnected!',
						type: 'is-danger'
					});
				});
			},
			handler_login(params){
				//this.user = this.$gun.user();
				//console.log(params);
				//console.log(this);
				//let blogin = false;
				let self = this;

				this.user.auth(params.username, params.passphrase,(ack)=>{
					//console.log(ack);
					if(ack.err){
						//console.log("fail!");
						self.$toast.open({
							message: 'Auth attempt failed!',
							type: 'is-danger'
						});
					}else{
						//console.log("Authorized!");
						self.$toast.open({
							message: 'Authorized!',
							type: 'is-success'
						});
						bus.$emit('login');
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
						self.$toast.open({
							message:ack.err ,
							type: 'is-danger'
						});
					}
					if(ack.pub){
						//console.log("created!", ack.pub);
						self.$toast.open({
							message: 'Alias Created: ' + params.username +'!',
							type: 'is-success'
						});
					}
				});
			},
			handler(params) {
				//console.log(params);
			},
			handler_logout(){//need to fixed there later...
				let self = this;
				console.log("event logout >> leave?");
				console.log(this.$gun);
				let user = this.$gun.user();
				console.log(user);
				user.leave();

				//this.$gun.user().leave();
				//bus.$emit('action','logout');
				this.blogin = false;
				location.reload();
			}
		},
	});
	let _loadingid = document.getElementById('loading');
	document.body.removeChild(_loadingid);
	//delete _loadingid;
	_loadingid = null;

//})()
