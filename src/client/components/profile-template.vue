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
				<el-input v-model="pubname" placeholder="name"></el-input> <el-button v-on:click="grantaccess('pubname')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Born">
				<el-input v-model="pubborn" placeholder="born"></el-input> <el-button v-on:click="grantaccess('pubborn')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Education">
				<el-input v-model="pubeducation" placeholder="education"></el-input> <el-button v-on:click="grantaccess('pubeducation')" icon="el-icon-plus" circle></el-button>
			</el-form-item>
			<el-form-item label="Skills">
				<el-input v-model="pubskills" placeholder="skills"></el-input> <el-button v-on:click="grantaccess('pubskills')" icon="el-icon-plus" circle></el-button>
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
	},
	methods:{

    },
}
</script>
<style lang="scss">

</style>
