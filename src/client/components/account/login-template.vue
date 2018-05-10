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
				<br><a href="#" v-on:click="bforgetpassword=true">Forgot Password?</a>
			</el-form-item>
		</el-form>

		<div v-if="bforgetpassword">
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
			iusername:'test',
			ipassphrase:'test',
			bforgetpassword:false,
			aliasname:'test',
			question1:'test1',
			question2:'test2',
			hint:'',
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
		async forgotpassword_aliascheck(){
			//console.log('hint');
			let user = this.$root.$gun.user();
			let gun = this.$root.$gun;
			//console.log('user',user);
			//console.log(user);
			let hint;
			let alias = await gun.get('alias/'+this.aliasname).then();
			console.log(alias);
			if(alias){
				console.log("checking...");
				hint = await gun.get('alias/'+this.aliasname).map().get('hint').then();
				//console.log(hint);
				this.checkhint(hint);
			}else{
				this.$message({message:'No Alias Found!',type: 'warning',duration:800});
			}
		},
		async checkhint(hint){
			let proof = await Gun.SEA.work(this.question1, this.question2);
			hint = await Gun.SEA.decrypt(hint, proof);
			console.log(hint);
			if(hint){
				this.hint = hint;
				this.$message({message:'Hint Found!',type: 'success',duration:800});
			}else{
				this.$message({message:'Fail Hint!',type: 'warning',duration:800});
			}
		}
    },
}
</script>
<style lang="scss">

</style>
