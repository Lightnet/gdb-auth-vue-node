<template id="chat">
	<div>
		<label>Chat Room:(Not public yet!)</label>
		<div v-if="!bshowlogin">
			<!--
			<button @click="action('home')"> Home</button>
			<button @click="action('lobby')" > Lobby</button>
			<button @click="action('rooms')" > Rooms</button>
			<button @click="action('pm')" > PM</button>
			<button @click="action('options')" > Options</button>
			<button @click="genChatKey" >Gen Public Key Chat</button>
			-->
			<div style="height: 300px; overflow-y: scroll;">
				<el-card class="box-card" v-for="message in messages" :key="message.id">
					<div>
					Alias:{{ message.from }}
					<br>
					{{ message.message }}
					</div>
				</el-card >
			</div>
			<div>
				<textarea v-model="chatmessage"> </textarea>
				<el-button type="primary" @click="sentmessage"> Chat </el-button>
				<el-button @click="checkchatmessage"> check </el-button>
			</div>
		</div>
	</div>
</template>

<script>
//event on and emit global
import bus from './bus';

function public_pair(){
	return {
		epriv: 'ouMEpyEGQnzCNXouQ5owt9VzuDdeoWr0H_rCyJopUWk',
		epub: '0VhBMpjKslndJbh3BFmNWca1TeIFq4PEerZJcRmNH9k.pW-MTXsu7witNqyYLGIuguQhDpZ5TCojE87O9gOB9nc',
		priv: 'Q2xkzpxoGtGCOR7f9SbKHVGxine9Dl57swbPUXlo2ow',
		pub: '0CKF4mpoQ1KcQy_mNOoIgB5EjoAhPwLe49bGn5URdBY.XqRVAfqyCpyUawlUDumtMitr6IZrRIUUEwNV6z-onNM'
	}
};

export default {
	//props:['blogin'],
	data() {
		return{
			userpublickey:'',
			bshowlogin:true,
			messages:[],
			sendersubject:'test subject',
			chatmessage:'test message',
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
			user.get('chatroom').get(this.publickey_chat).map().once((data)=>{
				console.log("data");
				console.log(data);
				//self.messages.push({id:data.id,text:data.message});
			});

			//user.get('chatroom').map().once((data,id)=>{
				//console.log("chat data");
				//console.log(data);
				//console.log(id);
				//self.messages.push({id:data.id,text:data.message});
			//});

			//chatroom id key
			//user.get('0CKF4mpoQ1KcQy_mNOoIgB5EjoAhPwLe49bGn5URdBY.XqRVAfqyCpyUawlUDumtMitr6IZrRIUUEwNV6z-onNM').map().once((data,id)=>{
				//console.log("chat data");
				//console.log(data);
				//console.log(id);
				//self.messages.push({id:data.id,text:data.message});
			//});


		},
		async updateMessageList(){
			//console.log("list?");
			let gun = this.$root.$gun;
			let user = this.$root.user;
			let self = this;

			let to = this.$root.$gun.user(this.publickey_chat);
			let dec = await Gun.SEA.secret(this.epublickey_chat, user.pair());

			user.get('chatroom').get(this.publickey_chat).map().once((say,id)=>{
				console.log("user chat");
				this.UI(say,id,dec);
				//self.messages.push({id:say.id,text:say.message});
			});

			to.get('chatroom').get(user.pair().pub).map().once((say,id)=>{
				console.log("to chat");
				this.UI(say,id,dec);
				//self.messages.push({id:say.id,text:say.message});
			});
			
		},
		async UI(say, id, dec){
			say = await Gun.SEA.decrypt(say,dec);
			console.log(say);
			if(!say)
				return;
			this.messages.push({id:id,from:say.alias,message:say.message});
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
			console.log("send!");
			//console.log(this.$root.user);
			let user = this.$root.$gun.user();
			var messagedata ={
				//'_':{'#':public_pair().pub},
				pub:"pub/"+user.is.pub,
				alias:user.is.alias,
				message:this.chatmessage,
			};
			
			var sec = await Gun.SEA.secret(this.epublickey_chat, user.pair());
			var enc = await Gun.SEA.encrypt(messagedata, sec);
			//let enc = messagedata;
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
