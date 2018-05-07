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
			-->

			<el-button size="mini" @click="action('inbox')"> Inbox</el-button>
			<el-button size="mini" @click="action('contacts')" > Contacts</el-button>
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

			<div style="height:400px;overflow-y: scroll;">
				Messages:
				<el-card class="box-card" v-for="message in messages" :key="message.id">
					<div>[From: {{ message.from }} ] > {{ message.message }} </div>
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
	methods:{
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
			console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			if(!who.alias){ return }
			user.get('contacts').get(pub).put({alias:who.alias});
			console.log('added');

		},
		async checkuser(){
			// h  // OhsmOcQu7mjfcvIqX7oaY2FhaKiXCAD6R5gGk5pln0w.P72Jf2iigd5hSlBPpeJpszItzLsO6B2ekzdQYAiZdfc
			// test  // QCn1C2k4jzMsmYQ7XA7jczU4tACHi8dm9FxA9rwc8mc.77BoSL7zXrBCeguBDlDNy-TV8rXfS-DiA5-Psfz5a-Q
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
	}
}
</script>

<style lang="scss">

</style>

