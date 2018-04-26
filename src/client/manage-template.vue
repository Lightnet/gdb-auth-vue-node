<template id="manage-template">
  	<div>
    	<h1>Manage Posts</h1>
    	<div class="list-group">
      		<a v-for="post in posts" :key="post.id" href="#" class="list-group-item clearfix">
        		{{ post.text }}
        		<span class="pull-right">
          		<button class="btn btn-xs btn-info" @click="topic_edit(post.id)">
            		<span class="glyphicon glyphicon-edit" ></span>
          		</button>
          		<button class="btn btn-xs btn-warning" @click="topic_delete(post.id)">
            		<span class="glyphicon glyphicon-trash"></span>
          		</button>
        		</span>
      		</a>
    	</div>
  	</div>
</template>

<script>
export default {
    name: 'app',
    data() {
		return {
			posts: [
        		//'Vue.js: The Basics',
        		//'Vue.js Components',
        		//'Server Side Rendering with Vue',
        		//'Vue + Firebase'
      		]
		}
	},
	created(){
		//let gun = this.$root.$gun;
		let gun = this.$root.user;
		this.gun_posts = gun.get('posts');
		let self = this;
		//console.log("test posts?");
		this.gun_posts.map().once(function(thought, id){
			//console.log(">>",thought,":",id);
			if (thought == null)
				return;
			//console.log(thought.posttitle);
			let textt = thought.posttitle;
			self.posts.push({
					id: id,
					text: textt
			});
      	});
	},
	methods:{
		removeTodo(){
			
		},
		topic_edit(id){
			console.log("topic_edit:",id);
		},
		topic_delete(id){
			console.log("topic_delete:",id);
		}
	},
	beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
    },
}
</script>