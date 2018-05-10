<template id="messages">
	<div>
		<div v-if="!bshowlogin">
			<!--
			<label>Message Section:</label>
			<button @click="action('draft')" > Draft</button>
			<button @click="action('compose')" > Compose</button>
			<button @click="action('sendmail')" > Send Mail</button>
			<button @click="action('options')" > Options</button>
			<button @click="trustuser" > Trust</button>
			<el-button size="mini" @click="action('inbox')"> Inbox</el-button>
			<el-button size="mini" @click="action('contacts')" > Contacts</el-button>
			-->
			<br><label>Private Message:</label>
			<br><label>Contacts:</label>
			<select v-model="contact">
				<option disabled value="">Please select one</option>
				<option v-for="item in contacts" :key="item.id" >
					{{ item.alias }}
				</option>
			</select>
			<!--
			<br> <label>Public Key:</label> <input v-model="addcontactpub">
			<el-button size="mini" @click="checkcontact">Add</el-button>
			<label>Status:{{contactpubstatus}}</label>
			-->
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

			<div id="messagescroll" style="overflow-y: scroll;">
				Messages:
				<el-card class="box-card" v-for="message in messages" :key="message.id">
					<div>
					<el-tag>From: {{ message.from }} </el-tag>
					<el-tag type="info"> {{ message.message }} </el-tag>
					<el-button type="danger" style="float: right; padding: 3px" icon="el-icon-delete" circle></el-button>
					</div>
				</el-card>
			</div>
			
		</div>
	</div>
</template>

<script>
//event on and emit global
import bus from './bus';

export default {
	//props:['blogin','username'],
	data() {
		return{
			contact:'',
			contacts:[],
			addcontactpub:'',
			contactpubstatus:'Normal',
			userpublickey:'',
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
			let self = this;

			this.contacts.filter(contact => {
				if(contact.alias == newvalue){
					self.pubkey = contact.id;
				}
				//return post.id !== idToRemove
			});
		}
	},
	created:function(){
		//console.log(this.$root.blogin);
		//console.log("user",this.$root.user);
		bus.$on('action',this.action);
		if(this.$root.blogin){
			this.bshowlogin = false;
			this.updateMessageList();
		}else{
			this.bshowlogin = true;
		}
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
		async updateMessageList(){
			//console.log("list?");
			//console.log(this.$root.$gun.user());
			let user = this.$root.user;
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
		async updateMessage(message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message);
    	},
		action(param){
			console.log(param);
		},
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
			console.log(SEA);
			var who = await gun.user(pub).then();
			var sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			var enc = await Gun.SEA.encrypt(what, sec);
			user.get('chat').get(pub).set(enc);
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

			console.log("SEA?");
			if(!Gun.SEA){
				Gun.SEA = SEA;	
			}
			//console.log(SEA);
			//Gun.SEA = SEA;
			
			let dec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			user.get('chat').get(pub).map().once((say,id)=>{
				console.log("user chat");
				this.UI(say,id,dec);
			});
			console.log("user.pair().pub: ",user.pair().pub);
			to.get('chat').get(user.pair().pub).map().once((say,id)=>{
				console.log("to chat");
				this.UI(say,id,dec);
			});
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
		async checkuser(){
			// h  // 
			// test // 
			this.messages = [];
			let user = this.$root.$gun.user();
			console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			console.log(this.pmusercheck);
			if(!who.alias){ return }
			console.log("who",who);
			let dec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			user.get('chat').get(pub).map().once((say,id)=>{
				console.log("user chat");
				this.UI(say,id,dec);
			});
			console.log("user.pair().pub: ",user.pair().pub);
			to.get('chat').get(user.pair().pub).map().once((say,id)=>{
				console.log("to chat");
				this.UI(say,id,dec);
			});
		},
		async UI(say, id, dec){
			say = await Gun.SEA.decrypt(say,dec);
			console.log(say);
			this.messages.push({id:id,from:say.from, subject:say.subject , message:say.content});
		}
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

