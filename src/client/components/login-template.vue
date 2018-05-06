<template>
	<div v-if="!blogin">
		<label>Login:</label>	
		<el-form>
			<el-form-item label="User">
				<el-col :span="8">
					<el-input placeholder="alias" v-model="iusername"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="Passphrase">
				<el-col :span="8">
					<el-input placeholder="password" v-model="ipassphrase"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" v-on:click="click_login()">Login</el-button>
				<el-button size="mini" v-on:click="click_siginup()">Sign Up</el-button>
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
