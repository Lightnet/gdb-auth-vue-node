<template id="chat">
	<div>
		<label>Chat Room:(not public yet)</label>
		<div v-if="!bshowlogin">
			<!--
			<button @click="action('home')"> Home</button>
			<button @click="action('lobby')" > Lobby</button>
			<button @click="action('rooms')" > Rooms</button>
			<button @click="action('pm')" > PM</button>
			<button @click="action('options')" > Options</button>
			-->

			<button @click="genChatKey" >Gen Public Key Chat</button>

			<div style="height: 300px; overflow-y: scroll;">
				Message:
				<a v-for="message in messages" :key="message.id" href="#" class="list-group-item clearfix">
					{{ message.text }}
				</a>
			</div>

			<div>
				Chat: <textarea v-model="chatmessage"> </textarea>
				<button @click="sentmessage"> Send </button>
				<button @click="checkchatmessage"> check </button>
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
			sendername:'z_FDSkeRC6EyM3_Q32-mZ3DR-n5Oh-e81Nx5VoT58Eg.7bnvKTOoKq3UbtnvCpQxxmEFCkzqAxA0MzGuO4moYLA',
			sendersubject:'tedst',
			chatmessage:'test',
			publickey_chat : '0CKF4mpoQ1KcQy_mNOoIgB5EjoAhPwLe49bGn5URdBY.XqRVAfqyCpyUawlUDumtMitr6IZrRIUUEwNV6z-onNM',
			epublickey_chat : '0VhBMpjKslndJbh3BFmNWca1TeIFq4PEerZJcRmNH9k.pW-MTXsu7witNqyYLGIuguQhDpZ5TCojE87O9gOB9nc',
		}
	},
	watch:{
		//blogin(n, o) {
      		//console.log(n, o) // n is the new value, o is the old value.
    	//}
	},
	beforeCreate: function() {
		//console.log("bcreated...");
		//console.log(this);
		//console.log(this.$parent.$parent);
		//console.log(this.$parent.$parent.blogin);
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
		genChatKey(){
			console.log(Gun.SEA.pair());

		},
		checkchatmessage(){
			let user =  this.$root.$gun.user();
			let self = this;

			//let dec = await Gun.SEA.secret(this.epublickey_chat, user.pair());
			
			user.get('chatroom').get(this.publickey_chat).map().once(function(data){
				console.log("data");
				console.log(data);
				//self.messages.push({id:data.id,text:data.message});
			});
		},
		async updateMessageList(){
			//console.log("list?");
			let user = this.$root.user;
			let self = this;
			//this.$root.$gun.user().get("pub/"+this.sendername).get('messages')
			//this.$root.$gun.get("pub/"+user.is.pub).get('messages').map().once(function(data,id){
			//this.$root.user.get('messages').get("pub/"+user.is.pub).map().once(function(data,id){
			//console.log(this.$root.$gun.user());

			let to = this.$root.$gun.user(this.publickey_chat);
			//console.log("to");
			//console.log(to );
			let who = await to.then() || {};

			//console.log("who");
			//console.log(who);

			//let dec = await Gun.SEA.secret(this.epublickey_chat, user.pair());
			let dec = await Gun.SEA.secret(this.epublickey_chat,'public');

			user.get('chatroom').get(this.publickey_chat).once((data)=>{
				console.log("publickey_data");
				console.log(data);
			});

			user.get('chatroom').get(this.publickey_chat).map().once((say,id)=>{
				console.log("publickey_chat");
				//console.log(say);
				//console.log(id);
				//this.UI(say,id,dec);
				self.messages.push({id:say.id,text:say.message});
			});

			to.get('chatroom').get(user.pair().pub).map().once((say,id)=>{
				console.log("user >> pair");
				//console.log(say);
				//console.log(id);
				//console.log("to chat");
				//this.UI(say,id,dec);
			});

		},
		async UI(say, id, dec){
			say = await Gun.SEA.decrypt(say,dec);
			console.log(say);
			if(!say)
				return;
			this.messages.push({id:id,text:"[From:]" + say.alias + " pMsg:]"  + say.message});
		},
		updateMessage(message) {
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
			//console.log(this.$root.user);
			//let user = this.$root.user;
			let user = this.$root.$gun.user();
			var messagedata ={
				pub:"pub/"+user.is.pub,
				alias:user.is.alias,
				message:this.chatmessage,
			};
			//var sec = await Gun.SEA.secret(who.epub, user.pair());
			//var sec = await Gun.SEA.secret(this.epublickey_chat, user.pair());
			//var sec = await Gun.SEA.secret(this.epublickey_chat, 'public');
			//var enc = await Gun.SEA.encrypt(messagedata, sec);
			let enc = messagedata;

			user.get('chatroom').get(this.publickey_chat).set(enc, function(ack){
				console.log(ack);
			});
		}
	},
	components: {
		//TodoList
	}
}
</script>

<style lang="scss">

</style>
