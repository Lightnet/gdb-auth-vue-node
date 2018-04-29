<template id="manage-template">
  	<div>
    	<h1>Manage Posts</h1>
    	<div class="list-group">
      		<a v-for="post in posts" :key="post.id" href="#" class="list-group-item clearfix">
				<label v-if="!post.bedit">
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
			if ((thought == null) || (thought == 'null'))
				return;
			self.posts.push({
					id: id,
					text: thought.posttitle,
					bedit: false,
			});
      	});
	},
	methods:{
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
			console.log(this);
			post.bedit = !post.bedit;
		},
		topic_delete(idToRemove){
			console.log("topic_delete:",idToRemove);
			let gun = this.$root.user;
			let gun_posts = gun.get('posts');
			gun_posts.get(idToRemove).put('null');

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