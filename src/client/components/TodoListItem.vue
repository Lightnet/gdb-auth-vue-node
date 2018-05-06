<template>
  	<li>
		<el-card class="box-card">
    	<span v-if="!todo.bedit">{{ todo.text }}</span>
		<el-input v-if="todo.bedit" v-model="todo.text" :id="todo.id" v-on="inputListeners"></el-input>
		<span style="float: right; padding: 3px 0">
		<el-button type="primary" icon="el-icon-edit" @click="$emit('edit', todo.id)" circle></el-button>
    	<el-button type="danger" icon="el-icon-delete" @click="$emit('remove', todo.id)" circle></el-button>
		</span>
		</el-card>
  	</li>
</template>

<script>
export default {
  	props: {
    	todo: {
      		type: Object,
      		required: true
    	}
  	},
  	computed: {
    	inputListeners: function () {
      		var vm = this;
      		// `Object.assign` merges objects together to form a new object
      		return Object.assign({},
        	// We add all the listeners from the parent
        	this.$listeners,
        	// Then we can add custom listeners or override the
        	// behavior of some listeners.
        	{
          		// This ensures that the component works with v-model
          		input: function (event) {
					//console.log(event);
            		//vm.$emit('input', event.target.value);//doesn't work with http://element.eleme.io
					vm.$emit('input', event);
          		}
        	})
    	}
  	}
}
</script>