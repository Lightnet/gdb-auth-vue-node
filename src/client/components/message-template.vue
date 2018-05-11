<template>
	<div v-if="blogin">
		<ComposeMessage
		@selectcontact="selectcontact"
		 />
		
		<MessageList 
		:messages="messages"
		>
		</MessageList>
	</div>
	<div v-else>
		<br>
		<center>
			<el-button type="warning" icon="el-icon-warning" circle></el-button>
			Please Login.
		</center>
	</div>
</template>

<script>
//event on and emit global
import Vue from 'vue';
import bus from '../bus';

import ComposeMessage from './message/ComposeMessage.vue';
import MessageList from './message/MessageList.vue';
//console.log(ComposeMessage);
//console.log(MessageList);
Vue.component('ComposeMessage', ComposeMessage);
Vue.component('MessageList',MessageList);

export default {
	components: {
		'ComposeMessage':ComposeMessage,
		'MessageList':MessageList,
	},
	//props:['blogin','username'],
	data() {
		return{
			blogin:false,
			contact:'', //select contact
			contacts:[ //contact list
				{id:"asd",alias:"test"}
			],
			messages:[ //messages from users
				//{id:"asd",alias:"test"}
			],
			pubkey:'',
		}
	},
	watch: {

	},
	created(){
		//console.log('created');
		//bus.$on('action',this.action);
		//console.log(this.$root.blogin);
		//console.log("user",this.$root.user);
		
		if(this.$root.user.is){
			//this.updateContactList();
			this.blogin = true;
			//this.updateMessageList();//test
			//console.log("update?");
		}
	},
	mounted(){
		//console.log('mounted');
		//console.log(this.$root.user.is);
		//window.addEventListener('resize', this.handleResize);
		//this.handleResize();
	},
	methods:{
		updateContactList(){
			//let user = this.$root.$gun.user();
			let user = this.$root.user;
			let self = this;
			console.log('contacts',user);

			user.get('contacts').map().once(function(data,id){
				console.log(data);
				if(data == 'null')
					return;
				//console.log(id);
				self.contacts.push({id:id,alias:data.alias});
			});
		},
		selectcontact(event){
			//console.log('event selected: ',event);
			this.pubkey = event;
			this.updateSelectAliasMessage();
		},
		async updateMessageList(){
			console.log("message?");
			this.messages = [];
			let user = this.$root.$gun.user();
			//console.log(this.pubkey);
			//let pub = (this.pubkey || '').trim();
			//if(!pub){ return }
			//let to = this.$root.$gun.user(pub);
			//let who = await to.then() || {};
			//this.pubkeystatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			//if(!who.alias){ return }
			//console.log("who",who);
			let dec = await Gun.SEA.secret(user.pair().epub, user.pair()); // Diffie-Hellman
			user.get('messages').get(user.pair().pub).map().once((say,id)=>{
			//user.get('messages').map().once((say,id)=>{
				if((say == null)||(say == 'null'))
					return;
				console.log("user chat");
				this.UI2(say,id,dec);
			});
			//console.log("user.pair().pub: ",user.pair().pub);
			//to.get('messages').get(user.pair().pub).map().once((say,id)=>{
				//console.log("to chat");
				//this.UI2(say,id,dec);
			//});
		},
		async updateSelectAliasMessage(){
			console.log("message?");
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
			user.get('messages').get(pub).map().once((say,id)=>{
				console.log("user chat");
				this.UI(say,id,dec);
			});
			console.log("user.pair().pub: ",user.pair().pub);
			to.get('messages').get(user.pair().pub).map().once((say,id)=>{
				console.log("to chat");
				this.UI(say,id,dec);
			});
		},
		async UI(say, id, dec){
			say = await Gun.SEA.decrypt(say,dec);
			console.log(say);
			this.messages.push({id:id,from:say.from, subject:say.subject , message:say.content});
		},
		async UI2(say, id, dec){
			//say = await Gun.SEA.decrypt(say,dec);
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

