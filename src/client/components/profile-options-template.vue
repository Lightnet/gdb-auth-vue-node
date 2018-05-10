<template>
	<div>
		<el-switch v-model="bchangepassword" active-text="Change Password"></el-switch>

		<el-form ref="form" label-width="128px" v-if="bchangepassword">
			<el-form-item label="Current Password">
				<el-input v-model="upassword" placeholder="Current Password"></el-input>
			</el-form-item>
			<el-form-item label="New Password">
				<el-input v-model="unpassword" placeholder="New Password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button v-on:click="changepassword"> Change Password </el-button>
			</el-form-item>
		</el-form>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	//props:['var'],
	data() {
		return{
			upassword:'',
			unpassword:'',
			bchangepassword:true,
		}
    },
    async created(){
		//console.log(this.username);
		if(this.$root.user.is){
			let user = this.$root.user;
		}
	},
	methods:{
		changepassword(){
			if(this.$root.user){
				console.log(this.$root.user);
				//let gun = this.$root.$gun
				let user = this.$root.$gun.user();
				//gun.user().auth(alias, old, cb, {change: newPass})
				let self = this;
				user.auth(user.is.alias,this.upassword,function(ack){
					console.log(ack);
					if(ack.err){
						self.$message({message:'Auth Fail Passwordd!',type: 'warning',duration:800});
						return;
					}
					if(ack.ack){
						self.$message({message:'Update Password!',type: 'success',duration:800});
					}
				},{change:this.unpassword});
			}	
			
		},
    },
}
</script>
<style lang="scss">

</style>
