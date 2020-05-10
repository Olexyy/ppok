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
        return this.$store.state.timer.time;
      },
      discuss() {
        return this.$store.state.discuss;
      },
      anyUnvoted() {
         return this.$store.state.anyUnvoted;
      },
      topic() {
        return this.$store.state.topic;
      }
    },
    methods: {
      onDiscussClick(e) {
				if (this.$store.state.discuss === 'idle') {
					this.$store.state.socket.emit('discuss', this.$store.state.room, 'discuss');
				}
        else if (this.$store.state.discuss === 'discuss' && this.$store.state.anyUnvoted) { 
					this.$store.state.socket.emit('discuss', this.$store.state.room, 'result');
				}
				else {
					this.$store.state.socket.emit('clear', this.$store.state.room);
				}
      }
    }
  }
</script>
