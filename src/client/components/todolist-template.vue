<template id="todolistapp">
	<div v-if="$root.blogin">
		<h1>My Todo List!</h1>
		<TodoList/>
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