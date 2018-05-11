<template>
	<div>
		<br><label>Compose:</label>
		<br><label>Contacts:</label>
		<select v-model="contact" v-on:change="$emit('selectcontact',contact)">
			<option disabled value="">Please select one</option>
			<option v-for="item in contacts" :key="item.id" :value="item.id">
				{{ item.alias }}
			</option>
		</select>

		<div>
			Public Key: <input v-model="pubkey">
			<el-button size="mini" @click="addcontact">Add</el-button>
			<label>{{pubkeystatus}}</label>
			<br>
			Subject: <input v-model="sendersubject">
			<br>
			Content: <textarea v-model="sendercontent"> </textarea>
			<el-button size="mini" @click="sentmessage"> Send </el-button>
		</div>
		
	</div>
</template>

<script>
//event on and emit global
import bus from '../../bus';

export default {
	//name: 'ComposeMessage',
	//props:['contacts'],
	data() {
		return{
			contact:'',
			contacts:[],
			contactpubstatus:'Normal',
			bshowlogin:true,
			messages:[],
			pubkey:'',
			sendersubject:'test subject',
			sendercontent:'test content',
			pubkeystatus:'Status:Normal',
			messagescrollid:'messagescroll',
		}
	},
	watch: {
		pubkey:function(newvalue,oldvalue){
			console.log("new string?");
			this.pubkeystatus = 'typing...';
			this.getpubkey();
		},
		contact:function(newvalue,oldvalue){
			console.log('change contact!',newvalue,oldvalue);
			//let self = this;

			//self.pubkey = 

			this.pubkey = newvalue;

			//this.contacts.filter(contact => {
				//if(contact.alias == newvalue){
					//self.pubkey = contact.id;
				//}
				//return post.id !== idToRemove
			//});
		}
	},
	created(){
		//console.log(this.$root.blogin);
		//console.log("user",this.$root.user);
		//bus.$on('selectcontact',this.selectcontact);
		this.updateContactList();
	},
	mounted(){
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	methods:{
		handleResize(event){
			if(!document.getElementById(this.messagescrollid))
				return;
			if(window.innerHeight > 400){
				let scrollheight = window.innerHeight - 250;
				document.getElementById(this.messagescrollid).style.height = scrollheight + 'px';
			}
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
		async updateContactList(){
			//console.log("list?");
			//console.log(this.$root.$gun.user());
			let user = this.$root.user;
			let self = this;
			//console.log('contacts');
			//user.get('contacts').once(function(){});
			let contactlist = await user.get('contacts').then();
			//console.log(contactlist);

			user.get('contacts').map().once((data,id)=>{
				//console.log(data);
				//console.log(id);
				if(data == 'null')
					return;
				self.contacts.push({id:id,alias:data.alias});
			});
		},
		//async updateMessage(message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		//this.$emit('update', message);
    	//},
		//selectcontact(param){
			//console.log(param);
			//this.pubkey = param;
		//},
		async sentmessage(){
			//console.log(this.sendername);
			//console.log(this.sendersubject);
			//console.log(this.sendercontent);
			console.log(this.$root.user);
			let gun = this.$root.$gun;
			let user = this.$root.user;
			var messagedata ={
				from:user.is.alias,
				subject:this.sendersubject,
				content:this.sendercontent,
			};
			let what = messagedata;
			if(!what){ return }
			var pub = (this.pubkey || '').trim();
			if(!pub) {
				this.$message('Send failed!');
				return 
			}
			//console.log(SEA);
			//get user data
			var who = await gun.user(pub).then();
			//get user pub key
			var sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			var enc = await Gun.SEA.encrypt(what, sec);
			user.get('messages').get(pub).set(enc);
		},
		async checkpubkey(){//needed
			this.messages = [];
			this.pubkeystatus = 'checking pub key...'
			let user = this.$root.$gun.user();
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			if(!who.alias){ return }
			console.log("who",who);
		},
		async addcontact(){
			let user = this.$root.$gun.user();
			//console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			if(!who.alias){ return }
			user.get('contacts').get(pub).put({alias:who.alias});
			console.log('added');
			this.$message({
				type: 'success',
				message: 'Added contact!'
			});
		},
	},
	components: {
		//TodoList
	},
	beforeDestroy() {
		//console.log('beforeDestroy');
  		window.removeEventListener('resize', this.handleResize);
	}
}
</script>

<style lang="scss">

</style>

