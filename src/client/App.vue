<template>
	<div id="app">
		<div>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="home">Home</el-menu-item>
				<el-menu-item index="account">Account</el-menu-item>
				<el-menu-item index="messages">Messages</el-menu-item>
				<el-menu-item index="chat">Chat</el-menu-item>
				<el-menu-item index="todolistapp">To Do List</el-menu-item>
				<el-menu-item index="manage-posts">Forum Posts</el-menu-item>
				<el-menu-item index="create-post">Create Post</el-menu-item>
			</el-menu>
		</div>

		<div class="container">
			<component :is="currentView" @update="updateMessage"></component>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import hometemplate from './home-template.vue';
import managetemplate from './manage-template.vue';
import createtemplate from './create-template.vue';
import toDoListTemplate from './todolist-template.vue';
import accountTemplate from './account-template.vue';
import messagesTemplate from './message-template.vue';
import chatTemplate from './chat-template.vue';

export default {
    name: 'app',
    data() {
		return {
			activeIndex:'account',
			activeName: 'Account',
			username:'none',
			//currentView: 'manage-posts'
			currentView: 'account',
			//currentView: 'todolistapp',
			//currentView: 'create-post',
			//blogin:false,
			postid:'default',
			postlistid:'default'
		}
	},
	created:function(){
		this.$on('update:username',(event)=>{
			console.log("data child?");
		});
	},
	components: {
		'home':hometemplate,
		'manage-posts':managetemplate,
		'create-post': createtemplate,
		'todolistapp':toDoListTemplate,
		'account':accountTemplate,
		'messages':messagesTemplate,
		'chat':chatTemplate,
	},
	methods: {
		handleSelect(key, keyPath) {
			this.currentView = key;
			//console.log(key);
        	//console.log(key, keyPath);
      	},
		updateMessage (message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message)
    	}
	}
}
</script>

<style lang="scss">
.el-menu{
	//padding: 0px 0px 0px 0px;
}
.el-menu-item{
	//padding: 4px 4px 10px 10px;
	//height:30px !important;
}
.header {
  padding: 15px 15px 20px 15px;
  border-bottom: 1px solid #e5e5e5;
}

.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}
</style>