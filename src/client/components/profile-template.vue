<template>
	<div>
		<el-card class="box-card" style="width:900px;">
			<div slot="header" class="clearfix">
			<span>Alias Name: {{username}}</span>
			
			</div><div>
			<el-button icon="el-icon-edit-outline"  v-on:click="copypubkey" circle style="float: right;"></el-button>
			<label>Public Key: <el-input id="pubkey" v-model="userpublickey" readonly="readonly"></el-input> </label>
			
			</div>
		</el-card>

		<el-form ref="form" label-width="64px">
			<el-form-item label="Alias">
				<el-input v-model="pubname" placeholder="name" v-on:change="updateprofiledata('name',pubname)"></el-input>
				<el-button v-on:click="grantaccess('pubname')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Born">
				<el-input v-model="pubborn" placeholder="born" v-on:change="updateprofiledata('born',pubborn)"></el-input>
				<el-button v-on:click="grantaccess('pubborn')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Education">
				<el-input v-model="pubeducation" placeholder="education" v-on:change="updateprofiledata('education',pubeducation)"></el-input>
				<el-button v-on:click="grantaccess('pubeducation')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Skills">
				<el-input v-model="pubskills" placeholder="skills" v-on:change="updateprofiledata('skills',pubskills)"></el-input>
				<el-button v-on:click="grantaccess('pubskills')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
		</el-form>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	props:['username','userpublickey'],
	data() {
		return{
			//username:'',
			//userpublickey:'',
			pubname:'',
			pubborn:'',
			pubeducation:'',
			pubskills:'',
		}
    },
    async created(){
		//console.log(this.username);
		if(this.$root.user.is){
			let user = this.$root.user;
			//user.get('profile').get('name').once((data)=>{
				//console.log(data);
				//this.pubname = data;
			//});
			this.pubname = await user.get('profile').get('name').then();
			this.pubborn = await user.get('profile').get('born').then();
			this.pubeducation = await user.get('profile').get('education').then();
			this.pubskills = await user.get('profile').get('skills').then();

		}
	},
	methods:{
		copypubkey(){
			/* Get the text field */
			var copyText = document.getElementById("pubkey");
			//console.log(copyText);
			/* Select the text field */
			copyText.select();  
			/* Copy the text inside the text field */
			document.execCommand("Copy");  
			/* Alert the copied text */
			//alert("Copied the text: " + copyText.value);
			this.$message({message:'Public Key Copy:' + copyText.value ,type: 'success',duration:800});
		},
		updateprofiledata(value,key){
			//console.log(value);
			this.$root.user.get('profile').get(value).put(key,(ack)=>{
				console.log(ack);
				if(ack.ok){
					this.$message({message:'Update ' + value + '!',type: 'success',duration:800});
				}
			});
		},
		grantaccess(event){
			console.log(event);
			console.log("test");
			this.$prompt('Grant Access Public Key:', 'Tip', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
			}).then(event => {
				console.log(event.value);
				 this.$message({
					type: 'success',
					message: 'Pub key:' + event.value
				});
			}).catch(() => {
          		this.$message({
            		type: 'info',
            		message: 'Public key canceled!'
          		});       
        	});
		}
    },
}
</script>
<style lang="scss">

</style>
