<template>
	<div v-if="!blogin">
		<!--
		<label>Login:</label>	
		-->
		<br>
		<el-form ref="form" label-width="128px" v-if="!bforgetpassword">
			<el-form-item label="User">
				<el-input placeholder="alias" v-model="iusername"></el-input>
			</el-form-item>
			<el-form-item label="Passphrase">
				<el-input placeholder="password" v-model="ipassphrase"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" v-on:click="click_login()">Login</el-button>
				<el-button size="mini" v-on:click="click_siginup()">Sign Up</el-button>
				<br><a href="#" v-on:click="bforgetpassword=true">Forgot Password</a>
			</el-form-item>
		</el-form>

		<el-form ref="form" label-width="128px" v-if="bforgetpassword">
			Forget Password (Not Added yet.)
			<el-form-item label="Alias">
				<el-input placeholder="alias" v-model="iusername"></el-input>
			</el-form-item>
			<el-form-item label="Q1:">
				<el-input placeholder="password" v-model="ipassphrase"></el-input>
			</el-form-item>
			<el-form-item label="Q2:">
				<el-input placeholder="password" v-model="ipassphrase"></el-input>
			</el-form-item>
			<el-form-item label="Answer:">
				<el-input placeholder="password" v-model="ipassphrase"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini">Sumbit</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import bus from '../bus';

export default {
	props:['blogin'],
	data() {
		return{
			iusername:'test',
			ipassphrase:'test',
			bforgetpassword:false,
		}
    },
    created(){
		
	},
	methods:{
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
    },
}
</script>
<style lang="scss">

</style>
