<template>
  <p ref="dom-element">{{counter}}</p>
</template>

<script>
//https://alligator.io/vuejs/component-lifecycle/
export default {
    data() {
        return {
            counter: 0
        }
    },
    beforeMount() {
        console.log(`this.$el doesn't exist yet, but it will soon!`)
    },
    mounted() {
        console.log(this.$el.textContent) // I'm text inside the component.
    }
    computed: {

    },
    beforeUpdate() {
        console.log(this.counter) // Logs the counter value every second, before the DOM updates.
    },
    updated() {

    },
    beforeCreate() {
        console.log('Nothing gets called before me!')
    }
    created() {

    },
    beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.

    },
    destroyed(){
		console.log("destroy");
    },
}
</script>