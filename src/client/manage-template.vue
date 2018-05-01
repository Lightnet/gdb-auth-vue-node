<template id="manage-template">
  	<div>
    	<h6>Forum Posts</h6>
    	<div class="list-group" v-if="bcategory">
      		<a v-for="post in posts" :key="post.id" href="#" class="list-group-item clearfix">
				<label v-if="!post.bedit"  v-on:click="viewpost(post)">
        			{{ post.text }}
				</label>
				<input v-if="post.bedit" v-model="post.text" v-on:change="topiceditchange(post)">
        		<span class="pull-right">
					<button class="btn btn-xs btn-info" v-on:click="topic_edit(post)">
						<span class="glyphicon glyphicon-edit" ></span>
					</button>
					<button class="btn btn-xs btn-warning" @click="topic_delete(post.id)">
						<span class="glyphicon glyphicon-trash"></span>
					</button>
        		</span>
      		</a>
    	</div>

		<div v-if="!bcategory">
			<div style="height:400px;overflow-y: scroll;"  class="container">
				<div v-for="topic in topics" :key="topic.id"  class="panel panel-default">
					<div class="panel-heading">User: {{topic.alias}}  | Title: {{ topic.posttitle }}</div>
					
					<div class="panel-body">{{ topic.content }}</div>
					<div class="panel-footer"> Date: {{ topic.postdate }}</div>
				</div>
			</div>
			<button v-if="!bpost" v-on:click="replypost_click"> Reply Topic </button>
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
		}
	},
	async created(){
		//let gun = this.$root.$gun;
		let gun = this.$root.user;
		this.gun_posts = gun.get('posts');
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
	methods:{
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