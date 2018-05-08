<template>
	<div>
		<el-button type="primary" size="mini" @click="$emit('newpost')">New Post</el-button>
		<el-card class="box-card" v-for="post in posts" :key="post.id" href="#">
			<label v-if="!post.bedit"  v-on:click="$emit('topicview',post)"> {{ post.text }} </label>
			<el-input v-if="post.bedit" v-model="post.text" v-on:change="$emit('topicchange',post)"></el-input>
			<span style="float: right; padding: 3px 0">
				<el-button type="primary" icon="el-icon-edit" @click="$emit('topicedit',post)" circle></el-button>
				<el-button type="danger" icon="el-icon-delete" @click="$emit('topicdelete',post)" circle></el-button>
			</span>
		</el-card>
    </div>
</template>
<script>
import bus from '../bus';

export default {
	props:['posts','topicpubkey'],
	data() {
		return{
			//bpost:false,
			//mtopics: this.topics,
		}
    },
    created(){
		
	},
	methods:{
		
	}
}
</script>
<style lang="scss">

</style>
