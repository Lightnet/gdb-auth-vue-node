<template id="Account">
	<div>
		<h1>My Account!</h1>
		<div v-if="bshowlogin">
			<label> User: </label>
			<input type="text" class="input" v-model="username" v-on="listeners">
			<br>
			<label> Passphrase: </label>
			<input type="text" class="input" v-model="passphrase" v-on="listeners">
			<br>
			<button v-on:click="click_login()">Login</button>
			<button v-on:click="click_siginup()">Sign Up</button>
		</div>
		<div v-if="bshowlogout">
			<button v-on:click="click_logout()">Logout</button>
		</div>
		<div v-if="bshowinfo">
			<label> User Name: </label>
		</div>
	</div>
</template>

<script>
//event on and emit global
import bus from './bus';

export default {
	props:['blogin'],
	data() {
		return{
			username:'test',
			passphrase:'test',
			bshowlogin:true,
			bshowlogout:false,
			bshowinfo:false
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
		listeners () {
        	//console.log("???");
      		return {
        		// Pass all component listeners directly to input
        		// this.$listeners,
				//...this.$listeners,
        		// Override input listener to work with v-model
        		input: event => this.$emit('input', event.target.value)
      		}
    	}
	},
	created:function(){
		//console.log(this.blogin);
		//console.log(this.$data);
		console.log(this);
		bus.$on('action',this.action);
		//console.log("action...");
		//console.log(this);
		if(this.$root.blogin){
			this.bshowlogin = false;
			this.bshowinfo = true;
			this.bshowlogout = true;
		}else{
			this.bshowlogin = true;
			this.bshowinfo = false;
			this.bshowlogout = false;
		}
	},
	methods:{
		click_login:function(){
			//console.log(this);
			//console.log("this.username",this.username);
			//console.log("this.passphrase",this.passphrase);
			bus.$emit('userlogin',{username:this.username,passphrase:this.passphrase});
			this.passphrase = '';
			//bus.$emit('userlogin',{username:'test',passphrase:'test'});
			//console.log("login...");
		},
		click_siginup:function(){
			bus.$emit('usersiginup',{username:this.username,passphrase:this.passphrase});
			this.passphrase = '';
		},
		click_logout:function(){
			bus.$emit('userlogout');
		},
		action:function(params){
			if(params == "hidelogin"){
				this.bshowlogin = false;
				this.bshowinfo = true;
				this.bshowlogout = true;
				this.$root.blogin = true;
			}
			if(params == "logout"){
				this.bshowlogin = true;
				this.bshowinfo = false;
				this.bshowlogout = false;
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