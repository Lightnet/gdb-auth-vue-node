<template>
  	<div v-if="blogin">
		<!--
    	<h6>Forum Posts</h6>
		-->
    	<div v-if="bcategory">
			<el-button type="primary" size="mini" v-on:click="replypost_click">New Post</el-button>
      		<el-card class="box-card" v-for="post in posts" :key="post.id" href="#">
				<label v-if="!post.bedit"  v-on:click="viewpost(post)"> {{ post.text }} </label>
				<el-input v-if="post.bedit" v-model="post.text" v-on:change="topiceditchange(post)"></el-input>
        		<span style="float: right; padding: 3px 0">
					<el-button type="primary" icon="el-icon-edit" v-on:click="topic_edit(post)" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" @click="topic_delete(post.id)" circle></el-button>
        		</span>
      		</el-card>
    	</div>

		<div v-if="!bcategory">
			<div style="height:400px;overflow-y: scroll;">
				<el-card class="box-card" v-for="topic in topics" :key="topic.id">
					<div slot="header" class="clearfix">User: {{topic.alias}}  | Title: {{ topic.posttitle }}</div>
					
					<el-main>{{ topic.content }}</el-main>
					<el-footer> Date: {{ topic.postdate }}</el-footer>
				</el-card>
			</div>

			<el-button type="primary" size="mini" v-if="!bpost" v-on:click="replypost_click"> Reply Topic </el-button>
			<div v-if="bpost">
			</div>
		</div>
  	</div>
</template>

<script>
export default {
    name: 'app',
    data() {
		return {
			bcategory: true,
			publickeypost:'',
			bpost:false,
			posts: [],
			topics:[],
			blogin:false,
		}
	},
	async created(){
		//let gun = this.$root.$gun;
		let gun = this.$root.user;
		this.gun_posts = gun.get('posts');
		if(gun.is){
			this.blogin = true;
		}

		console.log(gun.is);

		this.updateforum();
	},
	methods:{
		updateforum(){
			let self = this;
			//console.log("test posts?");
			this.gun_posts.map().once((post, id)=>{
				//console.log(">>",thought,":",id);
				if ((post == null) || (post == 'null')){
					return;
				}
				self.posts.push({
					id: id,
					text: post.posttitle,
					bedit: false
				});
			});
		},
		replypost_click(){
			this.$root.publickeypost = this.publickeypost;
			//this.bpost = true;
			console.log(this.$parent);
			this.$parent.currentView = 'create-post';
		},
		viewpost(event){
			//console.log('view?');
			//console.log('event',event);
			this.bcategory = false;
			this.topics = [];
			let gun = this.$root.user;
			let gun_posts = gun.get('posts');
			//console.log('data');
			let self = this;
			//id post
			gun_posts.get(event.id).once((data)=>{
				//console.log(data);
				self.topics.push({
					id:event.id,
					alias:data.alias,
					posttitle:data.posttitle,
					content:data.postcontent,
					postdate:data.postdate
				});
			});
			//get key id for map topic post list
			gun.get(event.id).map().once((data,id)=>{
				//console.log(data);
				//console.log(id);
				self.topics.push({
					id:id,
					alias:data.alias,
					posttitle:data.posttitle,
					content:data.postcontent,
					postdate:data.postdate
				});
					
			});
			this.publickeypost = event.id;
		},
		topiceditchange(post){ //press enter to finish edit
			//console.log(post);
			//console.log("change?");
			let gun = this.$root.user;
			let gun_posts = gun.get('posts');
			gun_posts.get(post.id).put({posttitle:post.text});
			post.bedit = false;
		},
		topic_edit(post){
			//console.log("topic_edit:",this.bedit);
			//console.log(this);
			post.bedit = !post.bedit;
		},
		topic_delete(idToRemove){
			//console.log("topic_delete:",idToRemove);
			let gun = this.$root.user;
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
		}
	},
	beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
    },
}
</script>

<style lang="scss">
 .el-header, .el-footer {
    //background-color: #B3C0D1;
	color: #333;
	height: 25px !important;
	margin-top: 0;
	margin-bottom: 0;
	//line-height: 20px;
	//font-size: 1.5em;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
</style>