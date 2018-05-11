<template>
	<div>
		<el-dropdown size="mini">
			<el-button type="primary">
				Forum List<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>Action 1</el-dropdown-item>
			</el-dropdown-menu>
		<span> unknown forum </span>
		</el-dropdown>
		<el-button>Remove</el-button>
		<el-input style="width:200px;"> </el-input>
		<el-button>Add</el-button>

		<a style="float:right;" href="#">Create Forum</a>

	</div>
</template>

<script>
export default {
    //name: 'app',
    data() {
		return {
			bforumlistselect:false,
			forums:[],
		}
	},
	created(){
		let gun = this.$root.user;
		//let gun = this.$root.$gun;
		this.updateForumList();
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
		updateForumList(){
			let user = this.$root.$gun.user();
			let self = this;
			//console.log('forums');
			//user.get('forums').map().once((data,id)=>{
				//if(data == 'null')
					//return;
				//console.log(data);
				//console.log(id);
				//self.forums.push({id:id,alias:data.alias});
			//});
		},
	},
	beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
		this.gun_posts = null;
    },
}
</script>