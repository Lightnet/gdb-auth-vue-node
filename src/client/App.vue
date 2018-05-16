<template>
	<div id="app">
		<div>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="home">Home</el-menu-item>
				<el-menu-item index="account">Account</el-menu-item>
				<el-menu-item index="pm">Messages</el-menu-item>
				<el-menu-item index="chat">Chat</el-menu-item>
				<el-menu-item index="todolistapp">To Do List</el-menu-item>
				<el-menu-item index="forum">Forum</el-menu-item>
				<el-menu-item index="create-post">Create Post</el-menu-item>

				<el-menu-item index="prototype">Test</el-menu-item>

				<el-submenu index="theme">
					<template slot="title">Theme</template>
					<el-menu-item index='light'>Light</el-menu-item>
					<el-menu-item index='dark'>Dark</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
		<div class="container">
			<component :is="currentView" @update="updateMessage" ></component>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import hometemplate from './components/Home-template.vue';
import forumtemplate from './components/Forum-template.vue';
import createtemplate from './components/forum/CreateTopic-template.vue';
import toDoListTemplate from './components/Todolist-template.vue';
import accountTemplate from './components/Account-template.vue';
import MsgBoxTemplate from './components/PMBox-template.vue';
import chatTemplate from './components/chat-template.vue';

import PrototypeTemplate from './components/Prototype-template.vue';
import './components/scss/element-variables.scss'; //css

export default {
    name: 'app',
    data() {
		return {
			activeIndex:'account',
			//activeName: 'Account',
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
	watch:{

	},
	created(){
		this.$on('update:username',(event)=>{
			console.log("data child?");
		});
	},
	components: {
		'home':hometemplate,
		'forum':forumtemplate,
		'create-post': createtemplate,
		'todolistapp':toDoListTemplate,
		'account':accountTemplate,
		//'messagebox':MessageBoxTemplate,
		'chat':chatTemplate,
		'pm':MsgBoxTemplate,
		'prototype':PrototypeTemplate,
	},
	methods: {
		handleSelect(key, keyPath) {
			//console.log(key, keyPath);
			//console.log(key);
			if(key == 'light'){
				//require('./element-light.scss');
				//console.log(document);
				document.querySelector('body').classList.remove("dark");
				document.querySelector('body').classList.add("light");
				require('./components/scss/element-light.scss');
				return;
			}
			if(key == 'dark'){
				//require('./element-dark.scss');
				document.querySelector('body').classList.remove("light");
				document.querySelector('body').classList.add("dark");

				//document.querySelector('body').classList.add("theme_dark");
				//dark();
				require('./components/scss/element-dark.scss');

				document.querySelector('body').classList.add("theme_dark");

				return;
			}
			//check if string is empty incase it goes blank.
			if(key != ''){
				this.currentView = key;
			}
      	},
		updateMessage (message) {
      		// By emitting the 'update' event in every intermediary component we can pass data
      		// from GrandchildComponent to ChildComponent and from there to the parent
      		this.$emit('update', message)
    	}
	}
}
console.log('app gunjs');
</script>

<style lang="scss">
//$--font-path: '~element-ui/lib/theme-chalk/fonts/element-icons.woff';
//@import './components/scss/element-variables.scss'; //css

//theme light
body.light {
	--text-color: white;
	--bg-color: black;
}
//theme dark
body.dark {
	--text-color: black;
	--bg-color: white;
}

.theme_dark {
	--color-primary: rgb(255, 0, 0);
	--text-color: black;
}

body {
	background-color: var(--text-color);
	color: var(--bg-color);
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