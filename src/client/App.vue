<template>
	<div id="app">
		<div class="header clearfix">
			<nav>
			<ul class="nav nav-pills pull-right">
				<li role="presentation">
				<a href="#" @click="currentView='account'">Account</a>
				</li>
				<li role="presentation">
				<a href="#" @click="currentView='todolistapp'">To Do List</a>
				</li>
				<li role="presentation">
				<a href="#" @click="currentView='manage-posts'">Manage Posts</a>
				</li>
				<li role="presentation">
				<a href="#" @click="currentView='create-post'">Create Post</a>
				</li>
			</ul>
			</nav>
			<h3 class="text-muted">Node Panel</h3>
		</div>

		<div class="container"  >
			<component :is="currentView" @update="updateMessage"></component>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import managetemplate from './manage-template.vue';
import createtemplate from './create-template.vue';
import ToDoListApp from './ToDoListApp.vue';
import Account from './Account.vue';

export default {
    name: 'app',
    data() {
		return {
			username:'none',
			//currentView: 'manage-posts'
			//currentView: 'account',
			currentView: 'todolistapp',
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
		'manage-posts':managetemplate,
		'create-post': createtemplate,
		'todolistapp':ToDoListApp,
		'account':Account
	},
	methods: {
		updateMessage (message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message)
    	}
	}
}
</script>

<style lang="scss">
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