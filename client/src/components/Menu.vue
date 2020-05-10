<template>
  <div class="mdl-card__menu">
    <span v-if="time">{{time}}</span>
    <button
      v-if="discuss === 'result' || (discuss === 'discuss' && !anyUnvoted)"
      id="discuss" 
      v-on:click="onDiscussClick"
      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Clear data
    </button>
    <button
      v-else-if="discuss === 'discuss'"
      id="discuss" 
      v-on:click="onDiscussClick"
      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Stop discussion
    </button>
    <button
      :disabled="!topic && discuss === 'idle'"
      v-else
      id="discuss" 
      v-on:click="onDiscussClick"
      class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Start discussion
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    computed: {
      time() {
        return this.$store.state.app.timer.time;
      },
      discuss() {
        return this.$store.state.app.discuss;
      },
      anyUnvoted() {
         return this.$store.state.app.anyUnvoted;
      },
      topic() {
        return this.$store.state.app.topic;
      }
    },
    methods: {
      onDiscussClick(e) {
				if (this.$store.state.app.discuss === 'idle') {
					this.$store.state.app.emit('discuss', 'discuss');
				}
        else if (this.$store.state.app.discuss === 'discuss' && this.$store.state.app.anyUnvoted) { 
					this.$store.state.app.emit('discuss', 'result');
				}
				else {
					this.$store.state.app.emit('clear');
				}
      }
    }
  }
</script>
