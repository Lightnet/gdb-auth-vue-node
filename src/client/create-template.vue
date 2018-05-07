<template id="create-template">
  	<div v-if="$root.blogin">
		<label>Parent:{{pubname}}</label>
		<br><label>public key:{{pubkey}}</label>
		<br><label>Status Post:{{poststatus}}</label>
		<br><label>Create Post</label>
		<el-form ref="form" action="javascript:void(0);" v-if="bpost" label-width="120px" style="width:500px;">
			<el-form-item label="Title">
				<div class="col-sm-10">
					<el-input placeholder="Post title Topic:" v-model="topictitle"></el-input>
				</div>
			</el-form-item>
			<el-form-item  label="Body:">
				<div class="col-sm-10">
					<el-input type="textarea" rows="5" v-model="topiccontent"></el-input>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button size="mini" type="primary" @click="topicpost">Create</el-button>
			</el-form-item>
		</el-form>
  	</div>
</template>

<script>
export default {
    name: 'app',
    data() {
		return {
			pubname:'default',
			pubkey:'none',
			poststatus:'normal',
			bpost:true,
			topictitle:'',
			topiccontent:'',
		}
	},
	created(){
		let gun = this.$root.user;
		//let gun = this.$root.$gun;
		this.gun_posts = gun.get('posts');

		this.pubkey = this.$root.publickeypost;
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
			let self = this;
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

				if(this.pubkey){
					console.log("keyfound!");
					let gun = this.$root.user;
					gun.get(this.pubkey).set(post,function(ack){
						console.log(ack);
						if(ack.err){
							self.poststatus = 'Error Post!';
						}
						if(ack.ok){
							self.poststatus = 'Posted!';
							self.bpost = false;
							self.$message({message:'Posted!',type: 'success',duration:800});
						}
					});
				}else{
					console.log("default!");
					this.gun_posts.set(post,function(ack){
						console.log(ack);
						if(ack.err){
							self.poststatus = 'Error Post!';
						}
						if(ack.ok){
							self.poststatus = 'Posted!';
							self.bpost = false;
							self.$message({message:'Posted!',type: 'success',duration:800});
						}
					});
				}
			}

			//this.bpost = false;
		}
	},
	beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
		this.gun_posts = null;
    },
}
</script>