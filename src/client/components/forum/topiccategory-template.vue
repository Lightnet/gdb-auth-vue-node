<template>
	<div>
		<el-button type="primary" size="mini" @click="$emit('newpost')">New Topic</el-button>

		<el-switch 
			v-model="bforumlistselect"
			active-text="Forum Public Key List"
			>List</el-switch>
		<div v-if="bforumlistselect">
			<ForumList> </ForumList>
		</div>
		<div id="topicscroll" style="overflow-y:scroll;">
			<el-card class="box-card" v-for="post in posts" :key="post.id" href="#">
				<label v-if="!post.bedit"  v-on:click="$emit('topicview',post)" class="wrap"> {{ post.text }} </label>
				<el-input v-if="post.bedit" v-model="post.text" v-on:change="$emit('topicchange',post)"></el-input>
				<span style="float: right; padding: 3px 0">
					<el-button type="primary" icon="el-icon-edit" @click="$emit('topicedit',post)" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="$emit('topicdelete',post)" circle></el-button>
				</span>
			</el-card>
		</div>
	</div>
</template>
<script>
import bus from '../../bus';

import ForumList from './ForumList.vue';

export default {
	components: {
		'ForumList':ForumList
	},
	props:['posts','topicpubkey'],
	data() {
		return{
			topicidhandle:'topicscroll',
			bforumlistselect:false,
			//bpost:false,
			//mtopics: this.topics,
		}
    },
    created(){
		//console.log('ready...');
		window.addEventListener('resize', this.handleResize);
	},
	mounted(){
		this.handleResize();
	},
	methods:{
		handleResize(event){
			//console.log('resize');
			//console.log(window.innerHeight);
			//console.log(document.getElementById(this.topicidhandle).clientHeight);
			//document.getElementById(this.topicidhandle).clientHeight = window.innerHeight;//read only
			if(window.innerHeight > 300){
				let scrollheight = window.innerHeight - 120;
				document.getElementById(this.topicidhandle).style.height = scrollheight + 'px';
			}
		}
	},
	beforeDestroy: function () {
		//console.log('beforeDestroy');
  		window.removeEventListener('resize', this.handleResize);
	}
}
</script>
<style lang="scss">

</style>
