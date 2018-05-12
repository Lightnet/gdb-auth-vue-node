<template>
	<div>
		<el-dropdown size="mini">
			<el-button type="primary">
				Chat Rooms<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>Action 1</el-dropdown-item>
			</el-dropdown-menu>
		<span> unknown chat </span>
		</el-dropdown>
		<el-button>
			Remove
		</el-button>
		<span >
			<el-input style="width:200px;"> </el-input>
		</span>
		<el-button>
			Add
		</el-button>
	</div>
</template>

<script>
//event on and emit global
import bus from '../../bus';

export default {
	//props:['blogin'],
	data() {
		return{
			//bchatlistselect:false,
		}
	},
	components: {
		//TodoList
	},
	watch:{
		//blogin(n, o) {
      		//console.log(n, o) // n is the new value, o is the old value.
    	//}
	},
	beforeCreate() {
	},
	created(){
		//bus.$on('action',this.action);
		//check if user exist to load page
		if(this.$root.user.is){
			//this.blogin = true;
			//this.updateMessageList();
		}
	},
	mounted(){},
	computed: {},
	methods:{
		genChatKey(){
			console.log(Gun.SEA.pair());
		},
		chatlist_edit(event){
			//console.log("edit",event);
			//event.bedit = event.bedit != true;
			//console.log(event.bedit);
		},
		chatlist_delete(event){
			//console.log("delete",event);
			//let user = this.$root.$gun.user();
			//user.get('chatroom').get(this.publickey_chat).get(event.id).put('null');
			//user.get('chatroom').get(event.id).put('null');
			//this.messages = this.messages.filter(todo => {
				//return todo.id !== event.id;
			//});
		},
	},
	beforeDestroy: function () {
		//console.log('beforeDestroy');
	}
}
</script>

<style lang="scss">
.wrap{
	content: "HTML";
}
</style>
