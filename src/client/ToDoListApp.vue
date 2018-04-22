<template id="todolistapp">
	<div>
		<h1>My Todo List!</h1>
		<TodoList/>
	</div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
	components: {
		TodoList
	}
}
</script>

<style lang="scss">

</style>