<template>
	<div id="app">
		<div class="header clearfix">
			<nav>
			<ul class="nav nav-pills pull-right">
				<li role="presentation">
				<a href="#" @click="currentView='manage-posts'">Manage Posts</a>
				</li>
				<li role="presentation">
				<a href="#" @click="currentView='create-post'">Create Post</a>
				</li>
			</ul>
			</nav>
			<h3 class="text-muted">Admin Panel</h3>
		</div>

		<div class="container">
			<component :is="currentView"></component>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import managetemplate from './manage-template.vue';
import createtemplate from './create-template.vue';

export default {
    name: 'app',
    data() {
		return {
			currentView: 'manage-posts'
		}
	},
	components: {'manage-posts':managetemplate, 'create-post': createtemplate},
	methods: {
	}
}
</script>

<style lang="scss">
.header {
  padding: 15px 15px 20px 15px;
  border-bottom: 1px solid #e5e5e5;
}

.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}
</style>