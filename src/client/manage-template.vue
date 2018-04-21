<template id="manage-template">
  <div>
    <h1>Manage Posts</h1>
    <div class="list-group">
      <a v-for="post in posts" :key="post.id" href="#" class="list-group-item clearfix">
        {{ post }}
        <span class="pull-right">
          <button class="btn btn-xs btn-info">
            <span class="glyphicon glyphicon-edit"></span>
          </button>
          <button class="btn btn-xs btn-warning">
            <span class="glyphicon glyphicon-trash"></span>
          </button>
        </span>
      </a>
    </div>
  </div>
</template>
<script>

export default {
    name: 'app',
    data() {
		return {
			posts: [
        'Vue.js: The Basics',
        'Vue.js Components',
        'Server Side Rendering with Vue',
        //'Vue + Firebase'
      ]
		}
	}
}
</script>