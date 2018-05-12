<template>
    <div>
		<br><label>Compose:</label>
		<br><label>Contacts:</label>
		<select v-model="contact" v-on:change="$emit('selectcontact',contact)">
			<option disabled value="">Please select one</option>
			<option v-for="item in contacts" :key="item.id" :value="item.id">
				{{ item.alias }}
			</option>
		</select>

		<div>
			Public Key: <input v-model="pubkey">
			<el-button size="mini" @click="addcontact">Add</el-button>
			<label>{{pubkeystatus}}</label>
			<br>
			Subject: <input v-model="sendersubject">
			<br>
			Content: <textarea v-model="sendercontent"> </textarea>
			<el-button size="mini" @click="sentmessage"> Send </el-button>
		</div>
		
	</div>
</template>
<script>
// private messsage to alias contact
export default {
    //components:{},
    data(){
        return{
            contact:'',
            contacts:[],
            contactpubstatus:'Normal',
            messages:[],
            pubkey:'',
            sendersubject:'test subject',
			sendercontent:'test content',
			pubkeystatus:'Status:Normal',
			messagescrollid:'messagescroll',
        }
    },
    watch: {
		pubkey:function(newvalue,oldvalue){
			//console.log("new string?");
			this.pubkeystatus = 'typing...';
			this.getpubkey();
		},
		contact:function(newvalue,oldvalue){
			//console.log('change contact!',newvalue,oldvalue);
			//let self = this;
			this.pubkey = newvalue;
			//this.contacts.filter(contact => {
				//if(contact.alias == newvalue){
					//self.pubkey = contact.id;
				//}
				//return post.id !== idToRemove
			//});
		}
	},
    created(){
        this.updateList();
    },
    methods:{
        async updateList(){
            let user = this.$root.$gun.user();
            user.get('contacts').map().once((data,id)=>{
                if((data == null)||(data == 'null'))
					return;
                //console.log('contact',data);
                this.contacts.push({id:id,alias:data.alias});
            });
        },
        getpubkey:_.debounce(//typing key checks pub key string
			async function(){
				//console.log(this.pubkey.length);
				if(this.pubkey.length == 87){
					this.checkpubkey();
				}else{
					this.pubkeystatus = 'Not pub key and single key current!'
				}
			}
		,500)
		,
        async sentmessage(){
			//console.log(this.sendername);
			//console.log(this.sendersubject);
			//console.log(this.sendercontent);
			//console.log(this.$root.user);
			let gun = this.$root.$gun;
			let user = this.$root.user;
			var messagedata ={
				from:user.is.alias,
				subject:this.sendersubject,
				content:this.sendercontent,
			};
			let what = messagedata;
			if(!what){ return }
			var pub = (this.pubkey || '').trim();
			if(!pub) {
				this.$message('Send failed!');
				return 
			}
			//console.log(SEA);
			//get user data
			var who = await gun.user(pub).then();
			//get user pub key
			var sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
			var enc = await Gun.SEA.encrypt(what, sec);
			user.get('messages').get(pub).set(enc);
		},
		async checkpubkey(){//needed
			this.messages = [];
			this.pubkeystatus = 'checking pub key...'
			let user = this.$root.$gun.user();
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			if(!who.alias){ return }
			//console.log("who",who);
		},
		async addcontact(){
			let user = this.$root.$gun.user();
			//console.log(this.pubkey);
			let pub = (this.pubkey || '').trim();
			if(!pub){ return }
			let to = this.$root.$gun.user(pub);
			let who = await to.then() || {};
			this.pubkeystatus = who.alias || "User not found.";
			//console.log(this.pmusercheck);
			if(!who.alias){ return }
			user.get('contacts').get(pub).put({alias:who.alias});
			//console.log('added');
			this.$message({
				type: 'success',
				message: 'Added contact!'
			});
		},
    },
}
</script>

