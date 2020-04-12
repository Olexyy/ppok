<template>
    <span>
      <dialog class="mdl-dialog" ref="name" id="name_dialog">
        <h4 class="mdl-dialog__title">Name yourself</h4>
        <div class="mdl-dialog__content">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input 
            v-model="userName"
            v-on:blur="onBlur"
            v-on:keypress="onKeyPress"
            class="mdl-textfield__input"
            type="text"
            id="name"
            name="name">
          <label class="mdl-textfield__label" for="Name">Name...</label>
          </div>
        </div>
      </dialog>
      <dialog class="mdl-dialog" ref="start" id="start_dialog">
        <h4 class="mdl-dialog__title">Starting</h4>
        <div class="mdl-dialog__content">
          <p>
          Please wait for connection.
          </p>
        </div>
      </dialog>
      <dialog class="mdl-dialog" ref="error" id="error_dialog">
        <h4 class="mdl-dialog__title">Error</h4>
        <div class="mdl-dialog__content">
          <p>
          Something went wrong, try reload page.
          </p>
        </div>
      </dialog>
    </span>
</template>

<script>
  import Users from './Users.vue'
  import Cards from './Cards.vue'
  import Topic from './Topic.vue'
  export default {
    name: 'Dialogs',
    mounted() {
      this.$store.dispatch('setDialog', {name: 'name', element: this.$refs.name});
      this.$store.dispatch('setDialog', {name: 'error', element: this.$refs.error});
      this.$store.dispatch('setDialog', {name: 'start', element: this.$refs.start});
    },
    methods: {
      onBlur(e) {
        this.handleEvent(e);
      },
      onKeyPress(e) {
        if (e.keyCode === 13) {
          this.handleEvent(e);
          e.target.blur();
          e.target.parentNode.classList.remove('is-focused');
        }
      },
      handleEvent(e) {
        if (e.target.value) {
          window.localStorage.setItem('pocker_name', e.target.value);
          this.$store.state.socket.emit('update', this.$store.state.room, 'name', e.target.value);
          this.$refs.name.close();
        }
      },
	  },
    computed: {
      userName: {
        get() {
          return this.$store.state.userName;
        },
        set(value) { }
      }
    }
  }
</script>
