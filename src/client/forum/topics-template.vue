<template>
	<div>
		<div style="height:400px;overflow-y: scroll;">
			<el-card class="box-card" v-for="topic in mtopics" :key="topic.id">
				<div slot="header" class="clearfix">User: {{topic.alias}}  | Title: {{ topic.posttitle }}</div>
				
				<el-main>
				<span v-if="!topic.bedit" class="wrap">{{ topic.content }}</span>
				<textarea v-if="topic.bedit" v-model="topic.content"></textarea>

				<span v-if="!topic.isParent" style="float: right; padding: 3px 0">
					<el-button type="primary" icon="el-icon-edit" v-on:click="topic_edit(topic)" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="topic_delete(topic)" circle></el-button>
        		</span></el-main>
				<el-footer> Date: {{ topic.postdate }}</el-footer>
			</el-card>
		</div>

		<el-button type="primary" size="mini" v-if="!bpost" v-on:click="replypost_click"> Reply Topic </el-button>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	props:['topics','topicpubkey'],
	data() {
		return{
			bpost:false,
			mtopics: this.topics,
		}
    },
    created(){
		
	},
	methods:{
		replypost_click(){
			this.$root.publickeypost = this.topicpubkey;
			//this.bpost = true;
			//console.log(this.$parent);
			this.$parent.$parent.currentView = 'create-post';
		},
		topic_edit(post){
			//console.log("topic_edit:",this.bedit);
			//console.log(this);
			post.bedit = !post.bedit;
		},
		topic_delete(event){
			//console.log("topic_delete:",idToRemove);
			let gun = this.$root.user;
			//console.log('this.topicpubkey',this.topicpubkey);
			//console.log('idToRemove',event.id);
			
			//let gun_posts = gun.get('posts').get(this.topicpubkey);
			//null child keys
			//gun.get(idToRemove).map().once((key,id)=>{
				//gun.get(idToRemove).get(id).put('null',function(ack){
					//console.log(ack);
				//});
			//});

			//null key
			gun.get(this.topicpubkey).get(event.id).put('null',function(ack){
				//console.log(ack);
			});
			//remove item from list
			let topics = this.mtopics;
			topics = topics.filter(post => {
				return post.id !== event.id
			});

			this.mtopics = topics;
		},
	}
}
</script>
<style lang="scss">
.wrap{
	content: "HTML";
}

code {
  white-space:no-wrap;
  word-break: break-all;
  word-wrap: break-word;
  display:block;
  margin:6px 0;
  color:#af7aa5;
}
</style>
