<template id="messages">
	<div>
		<label>Actions:</label>
		<div v-if="!bshowlogin">
			<!--
			<button @click="action('inbox')"> Inbox</button>
			<button @click="action('draft')" > Draft</button>
			<button @click="action('compose')" > Compose</button>
			<button @click="action('sendmail')" > Send Mail</button>
			<button @click="action('contacts')" > Contacts</button>
			
			<button @click="action('options')" > Options</button>
			
			<input v-model="adduser">
			<button @click="trustuser" > Trust</button>
			-->
			<div>
				sender: <input v-model="sendername"><button @click="checkuser"> Check </button><label>{{pmusercheck}}</label>
				<br>
				<!--
				subject: <input v-model="sendersubject">
				<br>
				-->
				Content: <textarea v-model="sendercontent"> </textarea>
				<br>
				<button @click="sentmessage"> Send </button>

			</div>

			<div>
				Message:
				<a v-for="message in messages" :key="message.id" href="#" class="list-group-item clearfix">
					{{ message.text }}
				</a>
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
			username:'',
			userpublickey:'',
			bshowlogin:true,
			messages:[],
			adduser:'hh',
			sendername:'OhsmOcQu7mjfcvIqX7oaY2FhaKiXCAD6R5gGk5pln0w.P72Jf2iigd5hSlBPpeJpszItzLsO6B2ekzdQYAiZdfc',
			sendersubject:'tedst',
			sendercontent:'test',
			pmusercheck:'',
		}
	},
	computed: {

	},
	created:function(){
		//console.log(this.$root.blogin);
		bus.$on('action',this.action);
		if(this.$root.blogin){
			this.bshowlogin = false;
			this.updateMessageList();
		}else{
			this.bshowlogin = true;
		}
		//console.log("user",this.$root.user);
	},
	methods:{
		trustuser(){
			console.log("trust user");

			this.$root.user.trust(this.adduser);
		},
		async updateMessageList(){
			//console.log("list?");
			console.log(this.$root.$gun.user());
			let user = this.$root.user;
			let self = this;
			console.log("user.pair().pub >> ",user.pair().pub);
			//user.get('chat').get(user.pair().pub).map().once((say,id)=>{
				//console.log("user chat");
				//console.log(say)
				//this.UI(say,id,dec);
			//});
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

			var pub = (this.sendername || '').trim();
			var who = await gun.user(pub).then();
			var sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			var enc = await Gun.SEA.encrypt(what, sec);
			user.get('chat').get(pub).set(enc);
		},
		async checkuser(){
			// h  // OhsmOcQu7mjfcvIqX7oaY2FhaKiXCAD6R5gGk5pln0w.P72Jf2iigd5hSlBPpeJpszItzLsO6B2ekzdQYAiZdfc
			// test  // QCn1C2k4jzMsmYQ7XA7jczU4tACHi8dm9FxA9rwc8mc.77BoSL7zXrBCeguBDlDNy-TV8rXfS-DiA5-Psfz5a-Q
			let user = this.$root.$gun.user();
			console.log(this.sendername);
			let pub = (this.sendername || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pmusercheck = who.alias || "User not found.";
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
			this.messages.push({id:id,text:"[From:]" + say.from + " pMsg:]"  + say.content});
		}
	},
	components: {
		//TodoList
	}
}
</script>

<style lang="scss">

</style>
