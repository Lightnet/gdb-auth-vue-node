<template>
	<div>
		<div class="card" style="width:890px;">
			<div class="card-content">
				<div class="media-content">
					<p class="label is-text">Alias: {{username}}</p>
				</div>
			</div>
			<div class="content">
				<b-field>
					<label class="button is-text">Public Key:</label> 
					<b-input id="pubkey" style="width:740px;" v-model="userpublickey" readonly="readonly"></b-input> 
					<p class="control">
						<button class="button" v-on:click="copypubkey"> 
							<b-icon
								pack="fas"
								icon="copy"
								size="is-small">
							</b-icon> 
						</button>
					</p>
				</b-field>
			</div>
		</div>

		<label class="is-text" v-if="bhint"> Please go to options for Forgot Password to setup hint. </label>

		<br>
		<div class="field">
		<b-switch v-model="bprofileinfo">Profile Information</b-switch>
		</div>
		<section v-if="bprofileinfo">
			<b-field>
				<label class="button is-text">Alias</label>
				<b-input style="width:400px;" v-model="pubname" placeholder="name" v-on:keyup.enter.native="updateprofiledata('name',pubname)"></b-input>
				<button class="button" v-on:click="access_pubkey('pubname')">
					<b-icon
                	pack="fas"
                	icon="user-plus"
                	size="is-small">
            		</b-icon>
				</button>
			</b-field>
			<b-field>
				<label class="button is-text">Born</label>
				<b-input style="width:400px;" v-model="pubborn" placeholder="born" v-on:keyup.enter.native="updateprofiledata('born',pubborn)"></b-input>
				<button class="button" v-on:click="access_pubkey('pubborn')">
					<b-icon
                	pack="fas"
                	icon="user-plus"
                	size="is-small">
            		</b-icon>
				</button>
			</b-field>
			<b-field>
				<label class="button is-text">Education</label>
				<b-input style="width:400px;" v-model="pubeducation" placeholder="education" v-on:keyup.enter.native="updateprofiledata('education',pubeducation)"></b-input>
				<button class="button" v-on:click="access_pubkey('pubeducation')">
					<b-icon
                	pack="fas"
                	icon="user-plus"
                	size="is-small">
            		</b-icon>
				</button>
			</b-field>
			<b-field>
				<label class="button is-text">Skills</label>
				<b-input style="width:400px;" v-model="pubskills" placeholder="skills" v-on:keyup.enter.native="updateprofiledata('skills',pubskills)"></b-input>
				<button class="button" v-on:click="access_pubkey('pubskills')">
					<b-icon
                	pack="fas"
                	icon="user-plus"
                	size="is-small">
            		</b-icon>
				</button>
			</b-field>
		</section>

    </div>
</template>
<script>
import bus from '../../bus';

export default {
	//props:['username','userpublickey'],
	data() {
		return{
			username:'',
			userpublickey:'',

			pubname:'',
			pubborn:'',
			pubeducation:'',
			pubskills:'',
			bprofileinfo:false,
			bhint:false,
		}
    },
    async created(){

		if(this.$root.user.is){
			let user = this.$root.user;
			this.username = user.is.alias;
			this.userpublickey = user.is.pub;

			this.pubname = await user.get('profile').get('name').then();
			//console.log(this.pubname);
			this.pubname = await this.getprofilevar('name', this.pubname);

			this.pubborn = await user.get('profile').get('born').then();
			this.pubeducation = await user.get('profile').get('education').then();
			this.pubskills = await user.get('profile').get('skills').then();

			//console.log(user.pair().pub);

			//let pkey = await user.get('trust').get(user.pair().pub).get('name'+'profile').then();
			//var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
			//let epub = await user.get('epub').then();
			//pkey = await Gun.SEA.decrypt(pkey, mix);
			//let val = await Gun.SEA.decrypt(this.pubname, pkey);
			//console.log(val);


			let hint = await user.get('hint').then();
			//console.log(hint);
			if(!hint){
				this.bhint = true;
			}
		}
	},
	methods:{
		async getprofilevar(_name,_value){
			let user = this.$root.user;

			let pkey = await user.get('trust').get(user.pair().pub).get(_name+'profile').then();
			var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
			let epub = await user.get('epub').then();
			pkey = await Gun.SEA.decrypt(pkey, mix);
			//console.log(pkey)
			let val = await Gun.SEA.decrypt(_value, pkey);
			//console.log(val)
			return val || _value;
		},
		copypubkey(){
			/* Get the text field */
			var copyText = document.getElementById("pubkey");
			//console.log(copyText);
			/* Select the text field */
			copyText.select();  
			/* Copy the text inside the text field */
			document.execCommand("Copy");  
			/* Alert the copied text */
			//alert("Copied the text: " + copyText.value);
			this.$toast.open({
				message: 'Public Key Copy:' + copyText.value,
				type: 'is-success'
			});
		},
		async updateprofiledata(value,key){
			//console.log(value);
			//this.$root.user.get('profile').get(value).put(key,(ack)=>{
			//console.log(this.$root.user.get('profile').get(value));

			let user = this.$root.user;
			console.log(user);

			user.get('profile').get(value).secret(key,(ack)=>{
				console.log(ack);
				if(ack.ok){
					//this.$message({message:'Update ' + value + '!',type: 'success',duration:800});
					this.$toast.open({
                    	message: 'Update ' + value + '!',
                    	type: 'is-success'
                	});
				}
			});

			//this.getprofilevar(key,value)

			//let pkey = await user.get('trust').get(user.pair().pub).get(user.is.alias+'profile').then();
			//console.log(pkey);

		},
		async access_pubkey(event){
			this.$dialog.prompt({
				message: 'Alias Public Key:',
				inputAttrs: {
					placeholder: 'e.g. xxx_xxxx.xxx'
				},
				onConfirm:(value)=>{
					//console.log('value:',value);
					//this.$toast.open(`Your name is: ${value}`);
					var pub = (value || '').trim();
					if(!pub) {
						this.$toast.open('Empty!');
						return;
					}
					var to = this.$root.$gun.user(pub);
					;(async () => {
						var who = await to.get('alias').then();
						if(!who) {
							this.$toast.open({message:'Public key fail!',type:'is-warning'});
							return;
						}
						//console.log(who);
						this.grantaccess_user(who,to,event);
					})();
				}
			});
		},
		grantaccess_user(who,to,event){
			console.log(event);
			this.$dialog.confirm({
				message: 'Grant access Alias to ' + who + '?',
				onConfirm:(value)=>{
					let user = this.$root.user;

					if(event == 'pubname'){
						console.log(user.get('profile').get('name'));
						user.get('profile').get('name').grant(to);
					}

					this.$toast.open({message:'Access Grant!',type:'is-success'});
				},
				onCancel:()=>{
					this.$toast.open({message:'Cancel Access!',type:'is-warning'});
				}
			});
		}
    },
}
</script>
<style lang="scss">

</style>
