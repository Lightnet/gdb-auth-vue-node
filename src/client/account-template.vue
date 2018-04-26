<template id="Account">
	<div>
		<label>My Account!</label>
		<div v-if="bshowlogin">
			<div class="form-group">
				<label> User: </label>
				<input type="text" class="input" v-model="iusername">
			</div>
			<div class="form-group">
				<label> Passphrase: </label>
				<input type="text" class="input" v-model="ipassphrase">
			</div>
			<div class="form-group">
				<button v-on:click="click_login()">Login</button>
				<button v-on:click="click_siginup()">Sign Up</button>
			</div>
		</div>
		<div v-if="!bshowlogin">
			<button v-on:click="click_logout()">Logout</button>
			<button v-on:click="setProfile()">set Profile</button>
			<button v-on:click="getProfile()">get Profile</button>
		</div>
		<div v-if="!bshowlogin">
			<div class="form-group">
				<label> User Name: {{username}} </label>
			</div>
			<div class="form-group">
				<label> Public Key: {{userpublickey}} </label>
			</div>
		</div>
	</div>
</template>

<script>
//event on and emit global
import bus from './bus';

export default {
	//props:['blogin','username'],
	data() {
		return{
			iusername:'test',
			ipassphrase:'test',
			username:'',
			userpublickey:'',
			bshowlogin:true,
		}
	},
	watch:{
		//blogin(n, o) {
      		//console.log(n, o) // n is the new value, o is the old value.
    	//}
	},
	beforeCreate: function() {
		//console.log("bcreated...");
		//console.log(this);
		//console.log(this.$parent.$parent);
		//console.log(this.$parent.$parent.blogin);
	},
	computed: {
		//displayuser:function(){
			//console.log("this",this);
			//console.log(this.username);
			//return this.username + "test";
		//},
		//listeners () {
        	//console.log("???");
      		//return {
        		// Pass all component listeners directly to input
        		// this.$listeners,
				//...this.$listeners,
        		// Override input listener to work with v-model
        		input: event => this.$emit('input', event.target.value)
      		//}
		//}
	},
	created:function(){
		//console.log(this.$root.blogin);
		bus.$on('action',this.action);
		if(this.$root.blogin){
			this.bshowlogin = false;
			this.updateprofile();
		}else{
			this.bshowlogin = true;
		}
		//console.log("user",this.$root.user);
	},
	methods:{
		updateprofile:function(){
			if(this.$root.user.is){
				this.username = this.$root.user.is.alias;
				this.userpublickey = this.$root.user.is.pub;
			}
		},
		updateMessage(message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message);
    	},
		setProfile:function(){
			let gun = this.$root.$gun;
			let user = this.$root.user;
			console.log(user);

			var test = {
				name: "test2",
				//_:{soul:user['_'].soul}
			};
			//user.get('profile').put(test);
			//gun.get('jgb7yy7ust~pm718zNKuDKlpVp_mi6Q1XKIl39wrYsGnLnEJY1QiYg.guaxTitPCqEwGRCIrGsR9gbaFN6RdyPYp7AWF7QyLeE').put(test);
			//gun.get('test').once(function(data,key){
  				//console.log("data:", data,key); // Alice
			//});
			//profile id {profile:#key}
			gun.get('jgb7yy7ust~pm718zNKuDKlpVp_mi6Q1XKIl39wrYsGnLnEJY1QiYg.guaxTitPCqEwGRCIrGsR9gbaFN6RdyPYp7AWF7QyLeE').once(function(data, key){
				// `once` grabs the data once, no subscriptions.
				console.log("profile >key ", key);
  				console.log("data ", data);
			});
			//user.once(function(data){
  				//console.log("data:", data); // Alice
			//});
		},
		getProfile:function(){
			let user = this.$root.user;
			console.log(user);

			//user.get('profile').get('name').once(function(data){
  				//console.log("Name is:", data); // Alice
			//});

			//user.get('profile').once(function(data){
  				//console.log("Name is:", data.name); // Alice
			//});

			console.log(this.$root.$gun);
			let gun = this.$root.$gun;
			//gun.get('alias/test').get('profile').once(function(data, key){
				// `once` grabs the data once, no subscriptions.
				//console.log("key ", key);
  				//console.log("data ", data);
			//});

			//public user access?
			//gun.get('alias/test').once(function(data, key){
				// `once` grabs the data once, no subscriptions.
				//console.log("key ", key);
  				//console.log("data ", data);
			//});

			gun.get('pub/'+user.is.pub).once(function(data, key){
				// `once` grabs the data once, no subscriptions.
				console.log(">>key ", key);
  				console.log("data ", data);
			});
			//profile id {profile:#key}
			//gun.get('jgb7yy7ust~pm718zNKuDKlpVp_mi6Q1XKIl39wrYsGnLnEJY1QiYg.guaxTitPCqEwGRCIrGsR9gbaFN6RdyPYp7AWF7QyLeE').once(function(data, key){
				// `once` grabs the data once, no subscriptions.
				//console.log("profile >key ", key);
  				//console.log("data ", data);
			//});
			
		},
		click_login:function(){
			//console.log(this);
			//console.log("this.username",this.username);
			//console.log("this.passphrase",this.passphrase);
			bus.$emit('userlogin',{username:this.iusername,passphrase:this.ipassphrase});
			this._passphrase = '';
			//bus.$emit('userlogin',{username:'test',passphrase:'test'});
			//console.log("login...");
		},
		click_siginup:function(){
			bus.$emit('usersiginup',{username:this.iusername,passphrase:this.ipassphrase});
			this.ipassphrase = '';
		},
		click_logout:function(){
			bus.$emit('userlogout');
		},
		action:function(params){
			if(params == "hidelogin"){
				this.bshowlogin = false;
				this.$root.blogin = true;
				this.updateprofile();
			}
			if(params == "logout"){
				//this.bshowlogin = true;
				this.$root.blogin = false;
			}
		}
	},
	components: {
		//TodoList
	}
}
</script>

<style lang="scss">

</style>
