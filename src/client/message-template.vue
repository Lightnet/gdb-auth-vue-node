<template id="messages">
	<div>
		<label>Actions:</label>
		<div v-if="!bshowlogin">
			<button @click="action('inbox')"> Inbox</button>
			<button @click="action('draft')" > Draft</button>
			<button @click="action('compose')" > Compose</button>
			<button @click="action('sendmail')" > Send Mail</button>
			<button @click="action('contacts')" > Contacts</button>
			
			<button @click="action('options')" > Options</button>
			<input v-model="adduser">
			<button @click="trustuser" > Trust</button>
			<div>
				sender: <input v-model="sendername">
				<br>
				subject: <input v-model="sendersubject">
				<br>
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
			sendername:'pm718zNKuDKlpVp_mi6Q1XKIl39wrYsGnLnEJY1QiYg.guaxTitPCqEwGRCIrGsR9gbaFN6RdyPYp7AWF7QyLeE',
			sendersubject:'tedst',
			sendercontent:'test',
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
		trustuser(){
			console.log("trust user");

			this.$root.user.trust(this.adduser);
		},
		updateMessageList(){
			console.log("list?");
			let user = this.$root.user;
			let self = this;
			this.$root.$gun.get("pub/"+user.is.pub).get('messages').map().once(function(data,id){
				if(!data.sender)
					return;
				console.log("===========data");
				console.log(data);
				console.log(id);
				self.messages.push({id:id,text:data.subject});
			});

		},
		updateMessage(message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message);
    	},
		action(param){
			console.log(param);
			if(param == "hidelogin"){

			}
			if(param== "logout"){
			}
		},
		sentmessage(){
			console.log(this.sendername);
			console.log(this.sendersubject);
			console.log(this.sendercontent);

			console.log(this.$root.user);

			let user = this.$root.user;

			var messagedata ={
				sender:"pub/"+user.is.pub,
				subject:this.sendersubject,
				content:this.sendercontent,
			};

			this.$root.$gun.get("pub/"+this.sendername).get('messages').set(messagedata);
		}
	},
	components: {
		//TodoList
	}
}
</script>

<style lang="scss">

</style>
