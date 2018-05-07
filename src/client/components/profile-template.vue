<template>
	<div>
		<el-card class="box-card" style="width:900px;">
			<div slot="header" class="clearfix">
			<span>Alias Name: {{username}}</span>
			<el-button icon="el-icon-edit-outline" circle style="float: right;"></el-button>
			</div><div>
			<label>Public Key: {{userpublickey}} </label>
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
    created(){
		//console.log(this.username);
		if(this.$root.user.is){
			this.$root.user.get('profile').get('name').once((data)=>{
				//console.log(data);
				this.pubname = data;
			});
			this.$root.user.get('profile').get('born').once((data)=>{
				//console.log(data);
				this.pubborn = data;
			});
			this.$root.user.get('profile').get('education').once((data)=>{
				//console.log(data);
				this.pubeducation = data;
			});
			this.$root.user.get('profile').get('skills').once((data)=>{
				//console.log(data);
				this.pubskills = data;
			});

		}
	},
	methods:{
		updateprofiledata(value,key){
			console.log(value);

			this.$root.user.get('profile').get(value).put(key,(ack)=>{
				console.log(ack);
				if(ack.ok){
					this.$message({message:'Update ' + value + '!',type: 'success',duration:800});
				}
			});
		},
		grantaccess(event){
			console.log("test");
		}
    },
}
</script>
<style lang="scss">

</style>
