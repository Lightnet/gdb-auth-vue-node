<template>
	<div>
		<div style="height:400px;overflow-y: scroll;">
			<el-card class="box-card" v-for="topic in topics" :key="topic.id">
				<div slot="header" class="clearfix">User: {{topic.alias}}  | Title: {{ topic.posttitle }}</div>
				
				<el-main>
				<span v-if="!topic.bedit">{{ topic.content }}</span>
				<textarea v-if="topic.bedit" v-model="topic.content"></textarea>

				<span style="float: right; padding: 3px 0">
					<el-button type="primary" icon="el-icon-edit" v-on:click="topic_edit(topic)" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="topic_delete(topic.id)" circle></el-button>
        		</span></el-main>
				<el-footer> Date: {{ topic.postdate }}</el-footer>
			</el-card>
		</div>

		<el-button type="primary" size="mini" v-if="!bpost"> Reply Topic </el-button>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	props:['topics'],
	data() {
		return{
			bpost:false,
		}
    },
    created(){
		
	},
	methods:{
		replypost_click(){
			this.$root.publickeypost = this.publickeypost;
			//this.bpost = true;
			console.log(this.$parent);
			this.$parent.$parent.currentView = 'create-post';
		},
		topic_edit(post){
			//console.log("topic_edit:",this.bedit);
			//console.log(this);
			post.bedit = !post.bedit;
		},
		topic_delete(idToRemove){
			//console.log("topic_delete:",idToRemove);
			let gun = this.$root.user;
			/*
			let gun_posts = gun.get('posts');
			//null child keys
			gun.get(idToRemove).map().once((key,id)=>{
				gun.get(idToRemove).get(id).put('null',function(ack){
					console.log(ack);
				});
			});
			//null key
			gun_posts.get(idToRemove).put('null',function(ack){
				console.log(ack);
			});
			//remove item from list
			this.posts = this.posts.filter(post => {
				return post.id !== idToRemove
			});
			*/
		},
	}
}
</script>
<style lang="scss">

</style>
