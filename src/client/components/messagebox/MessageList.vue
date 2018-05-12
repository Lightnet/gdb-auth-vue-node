<template>
	<div>
		<div v-if="!bshowlogin">

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
import bus from '../../bus';

export default {
	props:['messages'],
	data() {
		return{
			contacts:[],
			bshowlogin:true,
			//messages:[],
			messagescrollid:'messagescroll',
		}
	},
	watch: {
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

