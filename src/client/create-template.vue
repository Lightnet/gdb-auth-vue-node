<template id="create-template">
  	<div v-if="$root.blogin">
		<h1>Create Post</h1>
		<form class="form-horizontal" action="javascript:void(0);">
			<div class="form-group">
				<label class="col-sm-2 control-label" >Post title</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" placeholder="Post title" v-model="topictitle">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-2 control-label">Post body</label>
				<div class="col-sm-10">
					<textarea class="form-control" rows="5" v-model="topiccontent"></textarea>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button class="btn btn-primary" @click="topicpost">Create</button>
				</div>
			</div>
		</form>
  	</div>
</template>
<script>
export default {
    name: 'app',
    data() {
		return {
			topictitle:'',
			topiccontent:'',
		}
	},
	created(){
		let gun = this.$root.user;
		/*
		this.gun_posts = gun.get('posts');
		this.gun_posts.map().once(function(thought, id){
			//console.log(">>",thought,":",id);
			if (thought == null)
				return;
			self.posts.push({
					id: id,
					text: thought
			});
      	});
		*/
		this.gun_posts = gun.get('posts');
	},
	
	methods:{
		formatDate(date) {
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			let strTime = hours + ':' + minutes + ' ' + ampm;
			return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
		},
		topicpost(){
			//console.log(this.topictitle);
			//console.log(this.topiccontent);
			//console.log("post!");

			let timestamp = new Date();
			timestamp = this.formatDate(timestamp)
			//console.log(timestamp);
			//console.log(this.$root);
			console.log(this.$root.user);
			let user = this.$root.user.is;
			if(user){
				var post = {
					//pub:user.pub,
					alias:user.alias,
					//soul:this.$root.user['_'].soul,
					posttitle:this.topictitle,
					postcontent:this.topiccontent,
					postdate: timestamp,
				}
				//this.gun_posts.get("pulbic/"+user.pub).set(post);
				this.gun_posts.set(post);
			}
		}
	},
	beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
		this.gun_posts = null;
    },
}
</script>