// client-side js

localStorage.clear(); //clear database for gun

// run by the browser each time your view template referencing it is loaded
import Vue from 'vue';
Vue.config.productionTip = false

import Element from 'element-ui'; // ui components
//import 'element-ui/lib/theme-chalk/index.css'; //css
import './components/scss/element-variables.scss'; //css
Vue.use(Element);
import VueGun from 'vue-gun';

//gun.js
import Gun from 'gun/gun';
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
//localhost 8080 , proxy doesn't work for reason when 8080 > 3000
//var gun = Gun(location.origin + '/gun');

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
//require('./test');
gun.on('hi', peer => {
	console.log('connect peer to',peer);
});
gun.on('bye', function(peer){// peer disconnect.
	console.log('disconnected from', peer);
});
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
		},
		created(){
			//console.log(this.$gun.user());
			this.user = this.$gun.user();
			this.setup_gunsocket();
			//console.log(this.user);
			bus.$on('event', this.handler);
			bus.$on('userlogin', this.handler_login);
			bus.$on('userlogout', this.handler_logout);
			bus.$on('usersiginup', this.usersiginup);
		},
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
			handler_logout(){
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
			}
		},
	});
	//$("#loading").empty();//empty element html when finish loading javascript...
	//var _loading = document.getElementById('loading');//.innerHTML = '';
	//_loading.innerHTML = '';
	//document.getElementById('loading').pop();
	var _loading = document.getElementById('loading');
	document.body.removeChild(_loading);
//})()