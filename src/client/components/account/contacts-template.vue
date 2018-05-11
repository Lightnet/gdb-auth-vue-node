<template>
	<div>
        <el-form ref="form" label-width="92px">
			<el-form-item label="Profile key">
				<el-input style="width:760px;" v-model="pubkey" placeholder="profile key">
				</el-input>
				<el-button type="primary" size="mini" @click="addcontact">Add</el-button>
				<label> Status: {{pubkeystatus}}</label>
			</el-form-item>
			<el-form-item label="Profile Info:">
				<el-switch v-model="bprofileinfo"></el-switch>
			</el-form-item>
			<span v-if="bprofileinfo">
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
			</span>
		</el-form>

		<div>
			Contacts:
			<div id="contactscroll" style="overflow:auto;">
				<el-card style="width:800px;" class="box-card" v-for="item in contacts" :key="item.id">
					<div slot="header" class="clearfix">
						Alias Name: {{ item.alias }} 
						<el-button style="float: right;" v-on:click="deletecontact(item)" type="danger" icon="el-icon-delete" circle></el-button> 
					</div>
					<div>
					<el-button icon="el-icon-edit-outline"  v-on:click="copypubkey(item.id)" circle style="float: right;"></el-button>
					Public Key:<el-input :id="item.id" v-model="item.id" readonly="readonly"> </el-input>
					</div>
				</el-card>
			</div>
		</div>

    </div>
</template>
<script>
import bus from '../../bus';

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
			contactscrollid:'contactscroll',
			bprofileinfo:false,
		}
    },
    created(){
		this.updatecontacts();
		window.addEventListener('resize', this.handleResize);
	},
	mounted(){
		this.handleResize();
	},
	watch: {
		pubkey:function(newvalue,oldvalue){
			//console.log("new string?");
			this.pubkeystatus = 'typing...';
			this.getpubkey();
		},
	},
	methods:{
		handleResize(event){
			//console.log('resize');
			//console.log(window.innerHeight);
			//console.log(document.getElementById(this.topicidhandle).clientHeight);
			//document.getElementById(this.topicidhandle).clientHeight = window.innerHeight;//read only
			if(window.innerHeight > 300){
				let scrollheight = window.innerHeight - 200;
				document.getElementById(this.contactscrollid).style.height = scrollheight + 'px';
			}
		},
		copypubkey(publicid){
			/* Get the text field */
			var copyText = document.getElementById(publicid);
			//console.log(copyText);
			/* Select the text field */
			copyText.select();  
			/* Copy the text inside the text field */
			document.execCommand("Copy");  
			/* Alert the copied text */
			//alert("Copied the text: " + copyText.value);
			this.$message({message:'Public Key Copy:' + copyText.value ,type: 'success',duration:800});
		},
		async addcontact(){
			let user = this.$root.$gun.user();
			//console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.contactpubstatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			if(!who.alias){ return }
			user.get('contacts').get(pub).put({alias:who.alias});
			this.$message({message:'Contacts Added!',type: 'success',duration:800});
			//need to fix this. incase over lap copy
			this.contacts.push({id:pub,alias:who.alias});
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

			to.get('profile').map().once((data,id)=>{
				//console.log("profile");
				//console.log(data);
				//console.log(id);
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
			let user = this.$root.$gun.user();
			let self = this;
			//console.log('contacts');
			user.get('contacts').map().once((data,id)=>{
				if(data == 'null')
					return;
				//console.log(data);
				//console.log(id);
				self.contacts.push({id:id,alias:data.alias});
			});
		},
		deletecontact(event){
			//console.log('event');
			//console.log(event);
			let user = this.$root.user;
			let self = this;
			//CKLj2fswWfmJKiSVHEhNCWQh-c9bHBWgh3I45lm3OJo.Flq2KgGaAOqptA09C8L_msnh4uu6NTZgKQuVswebKoE

			this.$confirm('This will permanently delete the '+ event.alias  + '. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {

				this.$message({
					type: 'success',
					message: 'Delete completed'
				});

				self.contacts = self.contacts.filter(contact => {
					if(contact.id == event.id){
						user.get('contacts').get(contact.id).put('null');
					}
					return contact.id !== event.id;
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Delete canceled'
				});          
			});
		},
    },
	beforeDestroy() {
		console.log('beforeDestroy');
  		window.removeEventListener('resize', this.handleResize);
	}
}
</script>

<style lang="scss">
</style>
