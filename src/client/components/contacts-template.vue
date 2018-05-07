<template>
	<div>

        <el-form ref="form" label-width="128px">
			<el-form-item label="Profile key">
				<el-input v-model="pubkey" placeholder="profile key"></el-input>
				<el-button type="primary" size="mini" @click="addcontact" style="float: right;">Add</el-button>
				<label> Status: {{pubkeystatus}}</label>
			</el-form-item>
			<el-form-item label="Name">
				<el-input v-model="pubname" placeholder="name"> </el-input> 
			</el-form-item>
			<el-form-item label="Born">
				<el-input v-model="pborn" placeholder="born"> </el-input> 
			</el-form-item>
			<el-form-item label="Education">
				<el-input v-model="peducation" placeholder="education"></el-input> 
			</el-form-item>
			<el-form-item label="Skills">
				<el-input v-model="pskills" placeholder="skills"></el-input> 
			</el-form-item>
		</el-form>

		<div style="height:500px;">
			Contacts:
			<el-card class="box-card" v-for="item in contacts" :key="item.id">
				<div slot="header" class="clearfix">
					Alias Name: {{ item.alias }} 
					<el-button style="float: right;" v-on:click="deletecontact(item)" type="danger" icon="el-icon-delete" circle></el-button> 
				</div>
				<div>
				Public Key: {{item.id}}
				</div>
			</el-card>
		</div>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	//props:['blogin','contacts'],
	props:['blogin'],
	data() {
		return{
			pubkeystatus:'Normal',
			pubkey:'',
			pubname:'',
			pborn:'',
			peducation:'',
			pskills:'',
			contacts:[],
		}
    },
    created(){
		this.updatecontacts();
	},
	watch: {
		pubkey:function(newvalue,oldvalue){
			console.log("new string?");
			this.pubkeystatus = 'typing...';
			this.getpubkey();
		},
	},
	methods:{
		async addcontact(){
			let user = this.$root.$gun.user();
			console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.contactpubstatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			if(!who.alias){ return }
			user.get('contacts').get(pub).put({alias:who.alias});
			this.$message({message:'Contacts Added!',type: 'success',duration:800});
			//console.log('added contact!');
		},
		getpubkey:_.debounce(//typing key checks pub key string
			async function(){
				//console.log(this.pubkey.length);
				if(this.pubkey.length == 87){
					this.checkpubkey();
				}else{
					this.pubkeystatus = 'Not pub key and single key current!'
				}
			}
		,500)
		,
		async checkpubkey(){
			this.messages = [];
			this.pubkeystatus = 'checking pub key...'
			let user = this.$root.$gun.user();
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = 'Name: '+ who.alias || "User not found.";
			if(!who.alias){ return }
			console.log("who",who);
			console.log("profile");
			//to.get('profile').get(user.pair().pub).map().once((data,id)=>{
				//console.log("profile");
				//console.log(data);
				//console.log(id);
				//this.UI(say,id,dec);
			//});

			to.get('profile').map().once((data,id)=>{
				console.log("profile");
				console.log(data);
				console.log(id);
				if(id == 'name'){
					this.pubname = data;
				}
				if(id == 'born'){
					this.pborn = data;
				}
				if(id == 'education'){
					this.peducation = data;
				}
				if(id == 'skills'){
					this.pskills = data;
				}
				//this.UI(say,id,dec);
			});
		},
		updatecontacts(){
			let user = this.$root.user;
			let self = this;

			console.log('contacts');
			user.get('contacts').map().once((data,id)=>{
				if(data == 'null')
					return;
				//console.log(data);
				//console.log(id);
				self.contacts.push({id:id,alias:data.alias});
			});
		},
		deletecontact(event){
			console.log('event');
			console.log(event);
			let user = this.$root.user;

			this.contacts.filter(contact => {
				if(contact.id == event.id){
					//self.pubkey = contact.id;
					user.get('contacts').get(contact.id).put('null');

				}
				//return post.id !== idToRemove
			});
		},
    },
}
</script>

<style lang="scss">
</style>
