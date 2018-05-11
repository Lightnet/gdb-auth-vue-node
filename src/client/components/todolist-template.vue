<template id="todolistapp">
	<div v-if="$root.blogin">
		<h1>My Todo List!</h1>
		<TodoList/>
	</div>
	<div v-else>
		<br>
		<center>
			<el-button type="warning" icon="el-icon-warning" circle></el-button>
			Please Login.
		</center>
	</div>
</template>

<script>
import TodoList from './todolist/TodoList.vue'

export default {
	components: {
		TodoList
	}
}
</script>

<style lang="scss">

</style>