<template>
    <div>
        <div id="messagescroll" style="overflow-y: scroll;">
            Messages:
            <el-card class="box-card" v-for="message in messages" :key="message.id">
                <div>
                <el-tag>From: {{ message.from }} </el-tag>
                <el-tag type="info"> {{ message.message }} </el-tag>
                <el-button type="danger" style="float: right; padding: 3px" icon="el-icon-delete" circle></el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
// private messsage list from contacts
export default {
    props:['messages'],
    data(){
        return{
            messagescrollid:'messagescroll',
        }
    },
    mounted(){
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
    },
    methods:{
		handleResize(event){
			if(!document.getElementById(this.messagescrollid))
				return;
			if(window.innerHeight > 400){
				let scrollheight = window.innerHeight - 250;
				document.getElementById(this.messagescrollid).style.height = scrollheight + 'px';
			}
        },
    },
    beforeDestroy() {
		//console.log('beforeDestroy');
  		window.removeEventListener('resize', this.handleResize);
	}
}
</script>

