<template>
    <main class="mdl-layout__content">
    <div class="page-content"><!-- Your content goes here -->
      <div class="mdl-grid">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">
          <div class="mdl-card__title">
            <h3 class="mdl-card__title-text">
              <span id='room_marker'>
                <b v-if="room">ROOM {{room.toUpperCase()}}</b>
              </span>
            </h3>
          </div>
          <div class="mdl-card__supporting-text">
            Write topic and click start to indicate discussion starts.
          </div>
          <div class="mdl-card__actions mdl-card--border"></div>
          <topic/>  
          <cards/>
          <users/>
          <div class="mdl-card__actions mdl-card--border">
            <a id="change_name" v-on:click="onChangeNameClick" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Change name
            </a>
          </div>
          <div class="mdl-card__menu">
            <span v-if="time" id="timer">{{time}}</span>
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
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import Users from './Users.vue'
  import Cards from './Cards.vue'
  import Topic from './Topic.vue'
  export default {
    name: 'Main',
    components: {
      Users,
      Cards,
      Topic
    },
    computed: {
      room() {
        return this.$store.state.room;
      },
      time() {
        return this.$store.state.time;
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
      onChangeNameClick(e) {
        this.$store.state.dialogs.name.showModal();
      },
      onDiscussClick(e) {
				if (this.$store.state.discuss === 'idle') {
					this.$store.state.socket.emit('discuss', this.$store.state.room, 'discuss');
				}
        else if (this.$store.state.discuss === 'discuss') { 
					this.$store.state.socket.emit('discuss', this.$store.state.room, 'result');
				}
				else {
					this.$store.state.socket.emit('clear', this.$store.state.room);
				}
      }
    }
  }
</script>
