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
            <a id="change_name" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Change name
            </a>
          </div>
          <div class="mdl-card__menu">
            <span id="timer"></span>
            <button id="discuss" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Start discussion
            </button>
          </div>
        </div>
      </div>
    </div>
    <dialog class="mdl-dialog" id="name_dialog">
      <h4 class="mdl-dialog__title">Name yourself</h4>
      <div class="mdl-dialog__content">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="name" name="name">
          <label class="mdl-textfield__label" for="Name">Name...</label>
        </div>
      </div>
    </dialog>
    <dialog class="mdl-dialog" id="start_dialog">
      <h4 class="mdl-dialog__title">Starting</h4>
      <div class="mdl-dialog__content">
        <p>
          Please wait for connection.
        </p>
      </div>
    </dialog>
    <dialog class="mdl-dialog" id="error_dialog">
      <h4 class="mdl-dialog__title">Error</h4>
      <div class="mdl-dialog__content">
        <p>
          Something went wrong, try reload page.
        </p>
      </div>
    </dialog>
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
      }
    }
  }
</script>
