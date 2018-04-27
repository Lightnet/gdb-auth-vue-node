<template id="chat">
	<div>
		<label>Chat Actions:</label>
		<div v-if="!bshowlogin">
			<button @click="action('home')"> Home</button>
			<button @click="action('lobby')" > Lobby</button>
			<button @click="action('rooms')" > Rooms</button>
			<button @click="action('pm')" > PM</button>
			<button @click="action('options')" > Options</button>
			<div style="height: 600px; overflow-y: scroll;">
				Message:
				<a v-for="message in messages" :key="message.id" href="#" class="list-group-item clearfix">
					{{ message.text }}
				</a>
			</div>

			<div>
				Content: <textarea v-model="sendercontent"> </textarea>
				<br>
				<button @click="sentmessage"> Send </button>
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
			//console.log("list?");
			let user = this.$root.user;
			let self = this;
			//this.$root.$gun.user().get("pub/"+this.sendername).get('messages')
			//this.$root.$gun.get("pub/"+user.is.pub).get('messages').map().once(function(data,id){
			//this.$root.user.get('messages').get("pub/"+user.is.pub).map().once(function(data,id){
			console.log(this.$root.$gun.user());

			this.$root.$gun.user().once(function(data){
				console.log("data");
				console.log(data);
			});


			this.$root.$gun.user().get('chat').map().once(function(data,id){
				//console.log("data");
				//console.log(data);
				if(!data.alias)
					return;
				//console.log("===========data");
				//console.log(data);
				//console.log(id);
				self.messages.push({id:id,text:data.message});
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
				pub:"pub/"+user.is.pub,
				alias:user.is.alias,
				message:this.sendercontent,
			};

			this.$root.$gun.user().get('chat').set(messagedata,function(ack){
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
