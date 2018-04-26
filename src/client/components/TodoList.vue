<template>
	<div>
		<BaseInputText 
			v-model="newTodoText"
			placeholder="New todo"
			@keydown.enter="addTodo"
		/>
		<ul v-if="todos.length">
			<TodoListItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
				@remove="removeTodo"
			/>
		</ul>
		<p v-else>
			Nothing left in the list. Add a new todo in the input above.
		</p>
	</div>
</template>

<script>
import BaseInputText from './BaseInputText.vue'
import TodoListItem from './TodoListItem.vue'

let nextTodoId = 1

export default {
	components: {
		BaseInputText, TodoListItem
	},
  	data () {
		return {
			newTodoText: '',
			todos: [
				/*
				{
					id: nextTodoId++,
					text: 'Learn Vue'
				},
				{
					id: nextTodoId++,
					text: 'Learn about single-file components'
				},
				{
					id: nextTodoId++,
					text: 'Fall in love'
				}
				*/
			]
		}
  	},
	created() { // get todo items and start listening to events once component is created
		this.fetchTodo();
		let gun = this.$root.$gun;
		this.gun_thoughts =  this.$root.user.get('thoughts');

		//console.log("thought ?");
		let self = this;
		this.gun_thoughts.map().once(function(thought, id){
			//console.log(">>",thought,":",id);
			if ((thought == null)||(thought == 'null'))
				return;
			self.todos.push({
					id: id,
					text: thought
			});
      	});
		//this.listenToEvents();
	},
	unmounted(){
		console.log("unmounted");
	},
	destroyed(){
		console.log("destroy");
	},
	methods: {
		fetchTodo() {
			let uri = 'http://localhost:4000/api/all';
			//axios.get(uri).then((response) => {
				//this.todos = response.data;
			//});
			//console.log(this.$root.$gun);
			//console.log(this.todos);
        },
		addTodo () {
			const trimmedText = this.newTodoText.trim()
			if (trimmedText) {
				//this.todos.push({
					//id: nextTodoId++,
					//text: trimmedText
				//})
				this.gun_thoughts.set(trimmedText);
				this.newTodoText = ''
			}
		},
		removeTodo (idToRemove) {
			console.log("idToRemove:",idToRemove);
			//this.$root.$gun.get('thoughts').get(idToRemove).put(null);
			//this.gun_thoughts.get(idToRemove).put(null);
			//this.$root.user.get('thoughts').get(idToRemove).once(function(value){
				//console.log(value);
			//});
			this.$root.user.get('thoughts').get(idToRemove).put(undefined);
			this.todos = this.todos.filter(todo => {
				return todo.id !== idToRemove
			});
		}
	}
}
</script>