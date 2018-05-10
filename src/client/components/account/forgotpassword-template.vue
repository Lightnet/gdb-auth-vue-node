<template>
	<div>
		<el-form ref="form" label-width="128px">
			<el-form-item>
				Forget Password
			</el-form-item>
			<el-form-item label="Alias">
				<el-input placeholder="alias" v-model="aliasname"></el-input>
			</el-form-item>
			<el-form-item label="Q1:">
				<el-input placeholder="Question1" v-model="question1"></el-input>
			</el-form-item>
			<el-form-item label="Q2:">
				<el-input placeholder="Question2" v-model="question2"></el-input>
			</el-form-item>
			<el-form-item label="Answer:">
				<el-input placeholder="Hint" v-model="hint"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" v-on:click="forgotpassword_aliascheck">Get Hint</el-button>
				<el-button size="mini" v-on:click="$parent.bforgetpassword=false">Back</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
import bus from '../../bus';

export default {
	props:['blogin'],
	data() {
		return{
			aliasname:'',
			question1:'',
			question2:'',
			hint:'',
		}
    },
    async created(){
		if(Gun.SEA == null){
			Gun.SEA = SEA;
		}
	},
	methods:{
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
