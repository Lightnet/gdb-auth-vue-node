<template id="todolistapp">
	<div v-if="$root.blogin">
		<h1>My Todo List!</h1>
		<TodoList/>
	</div>
	<div v-else>
		<PleaseLogin/>
	</div>
</template>

<script>
import TodoList from './todolist/TodoList.vue'
import PleaseLogin from './pleaselogin-template.vue';

export default {
	components: {
		TodoList,
		PleaseLogin
	}
}
</script>

<style lang="scss">

</style>