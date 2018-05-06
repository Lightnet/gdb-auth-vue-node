<template>
	<div>


        <el-form ref="form" label-width="128px">
				<el-form-item label="Profile key">
					<el-input  placeholder="profile key"></el-input> 
				</el-form-item>
				<el-form-item label="Name">
					<el-input v-model="pubname" placeholder="name"> </el-input> 
				</el-form-item>
				<el-form-item label="Born">
					<el-input v-model="pborn" placeholder="born"> </el-input> 
				</el-form-item>
				<el-form-item label="Education">
					<el-input v-model="peducation" placeholder="education"></el-input> 
				</el-form-item>
				<el-form-item label="Skills">
					<el-input v-model="pskills" placeholder="skills"></el-input> 
				</el-form-item>
			</el-form>

			<div style="height:500px;">
				Contacts:
				<ul>
					<li v-for="item in contacts" :key="item.id">
						[Alias Name:] {{ item.alias }} [Public Key:] {{item.id}} 
						<span class="pull-right">
							<button v-on:click="deletecontact(item)"> Delete </button> 
						</span>
					</li>
				</ul>
			</div>

    </div>
</template>
<script>
import bus from '../bus';

export default {
	props:['blogin','contacts'],
	data() {
		return{
			pubname:'',
			pborn:'',
			peducation:'',
			pskills:'',
		}
    },
    created(){
		
	},
	methods:{
		updatecontacts(){
			let user = this.$root.user;
			let self = this;

			console.log('contacts');
			user.get('contacts').map().once((data,id)=>{
				if(data == 'null')
					return;
				//console.log(data);
				//console.log(id);
				self.contacts.push({id:id,alias:data.alias});
			});
		},
		deletecontact(event){
			console.log('event');
			console.log(event);
			let user = this.$root.user;

			this.contacts.filter(contact => {
				if(contact.id == event.id){
					//self.pubkey = contact.id;
					user.get('contacts').get(contact.id).put('null');

				}
				//return post.id !== idToRemove
			});
		},
    },
}
</script>

<style lang="scss">
</style>
