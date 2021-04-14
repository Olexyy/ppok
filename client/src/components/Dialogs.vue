<template>
    <span>
      <dialog class="mdl-dialog" ref="name" id="name_dialog">
        <h4 class="mdl-dialog__title">Name yourself</h4>
        <div class="mdl-dialog__content">
          <p>Field is required, cannot match any existing name.</p>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              v-model="userName"
              v-on:blur="onBlur"
              v-on:keypress="onKeyPress"
              class="mdl-textfield__input"
              type="text"
              data-ref="name"
              id="name"
              name="name">
            <label class="mdl-textfield__label" for="name">Name...</label>
          </div>
        </div>
      </dialog>
      <dialog class="mdl-dialog" ref="change" id="change_dialog">
        <h4 class="mdl-dialog__title">Change name</h4>
        <div class="mdl-dialog__content">
          <p>Field is required, cannot match any existing name, press ESC to cancel.</p>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
              v-model="userName"
              v-on:blur="onBlur"
              v-on:keypress="onKeyPress"
              data-ref="change"
              class="mdl-textfield__input"
              type="text"
              id="name"
              name="name">
          <label class="mdl-textfield__label" for="name">Name...</label>
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
  export default {
    name: 'Dialogs',
    mounted() {
      this.$store.dispatch('setDialog', {name: 'name', element: this.$refs.name});
      this.$store.dispatch('setDialog', {name: 'error', element: this.$refs.error});
      this.$store.dispatch('setDialog', {name: 'start', element: this.$refs.start});
      this.$store.dispatch('setDialog', {name: 'change', element: this.$refs.change});
      this.$refs.name.addEventListener('cancel', e => {
        e.preventDefault();
      });
    },
    methods: {
      onBlur(e) {
        this.handleEvent(e);
      },
      onKeyPress(e) {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
          this.handleEvent(e);
          e.target.blur();
          e.target.parentNode.classList.remove('is-focused');
        }
      },
      handleEvent(e) {
        const name = e.target.value;
        if (name) {
          if (this.$store.state.app.nameExists(name)) {
            e.target.parentNode.classList.add('is-invalid');
          }
          else {
            e.target.parentNode.classList.remove('is-invalid');
            const localData = this.$store.state.app.getLocalData();
            localData.name = e.target.value;
            this.$store.state.app.setLocalData(localData);
            this.$store.state.app.emit('update', this.$store.state.app.buildUser({
              name: localData.name
            }));
            const ref = e.target.getAttribute('data-ref');
            this.$refs[ref].close();
          }
        }
      },
    },
    computed: {
      userName: {
        get() {
          return this.$store.state.app.userName;
        },
        // eslint-disable-next-line no-unused-vars
        set(value) { }
      }
    }
  }
</script>
