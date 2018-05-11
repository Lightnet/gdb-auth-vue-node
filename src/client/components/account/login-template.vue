<template>
	<div v-if="!blogin">
		<!--
		<label>Login:</label>	
		-->
		<br>
		<el-form ref="form" label-width="128px" v-if="!bforgetpassword">
			<el-form-item label="User">
				<el-input placeholder="alias" v-model="aliasname"></el-input>
			</el-form-item>
			<el-form-item label="Passphrase">
				<el-input placeholder="password" v-model="passphrase"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" v-on:click="loginclick()">Login</el-button>
				<el-button size="mini" v-on:click="siginupclick()">Sign Up</el-button>
				<br><a href="#" v-on:click="bforgetpassword=true">Forgot Password?</a>
			</el-form-item>
		</el-form>

		<div v-if="bforgetpassword">
			Test
			<forgotpassword></forgotpassword>
		</div>

	</div>
</template>
<script>
import bus from '../../bus';

import forgotpassword from './forgotpassword-template.vue'

export default {
	props:['blogin'],
	data() {
		return{
			aliasname:'test',
			passphrase:'test',
			bforgetpassword:false,
		}
    },
	components:{
		'forgotpassword':forgotpassword,
	},
    async created(){
		if(Gun.SEA == null){
			Gun.SEA = SEA;
		}
	},
	methods:{
		loginclick:function(){
			//console.log(this);
			//console.log("this.username",this.username);
			//console.log("this.passphrase",this.passphrase);
			bus.$emit('userlogin',{username:this.aliasname,passphrase:this.passphrase});
			this._passphrase = '';
			//bus.$emit('userlogin',{username:'test',passphrase:'test'});
			//console.log("login...");
		},
		siginupclick:function(){
			bus.$emit('usersiginup',{username:this.aliasname,passphrase:this.passphrase});
			this.passphrase = '';
		},
    },
}
</script>
<style lang="scss">

</style>
