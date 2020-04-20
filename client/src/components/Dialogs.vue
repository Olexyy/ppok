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
      <dialog class="mdl-dialog" ref="repo" id="repo_dialog">
        <h4 class="mdl-dialog__title">Github credentials</h4>
        <div class="mdl-dialog__content">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input 
            v-model="githubUser"
            v-on:blur="onBlurRepo"
            v-on:keypress="onKeyPressRepo"
            class="mdl-textfield__input"
            type="text"
            name="githubUser">
          <label class="mdl-textfield__label" for="githubUser">Github user name...</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              v-model="githubToken"
              v-on:blur="onBlurRepo"
              v-on:keypress="onKeyPressRepo"
              class="mdl-textfield__input"
              type="text"
              name="githubToken">
            <label class="mdl-textfield__label" for="githubToken">Github token...</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              v-model="owner"
              v-on:blur="onBlurRepo"
              v-on:keypress="onKeyPressRepo"
              class="mdl-textfield__input"
              type="text"
              name="owner">
            <label class="mdl-textfield__label" for="owner">Owner...</label>
          </div>
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
      this.$store.dispatch('setDialog', {name: 'repo', element: this.$refs.repo});
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
      onBlurRepo(e) {
        this.handleEventRepo(e);
      },
      onKeyPressRepo(e) {
        if (e.keyCode === 13) {
          this.handleEventRepo(e);
          e.target.blur();
          e.target.parentNode.classList.remove('is-focused');
        }
      },
      handleEventRepo(e) {
        const $this = this;
        if (this.$store.state.githubUser && this.$store.state.githubToken && this.$store.state.githubData.owner) {
          const credentials = {
            u: this.$store.state.githubUser,
            t: this.$store.state.githubToken, 
            o: this.$store.state.githubData.owner
          }
          this.$store.state.githubCli.fromObject(credentials).then(data => {
              window.localStorage.setItem('pocker_data', JSON.stringify(credentials));
              $this.$store.dispatch('setRepoConnect', true);
              $this.$refs.repo.close();
              $this.$store.state.githubCli.getRepos().then(repos => {
                $this.$store.dispatch('setRepos', repos);
              });
          });
        }
      },
	  },
    computed: {
      userName: {
        get() {
          return this.$store.state.userName;
        },
        set(value) { }
      },
      githubUser: {
        get() {
          return this.$store.state.githubUser;
        },
        set(value) {
          return this.$store.state.githubUser = value;
        }
      },
      githubToken: {
        get() {
          return this.$store.state.githubToken;
        },
        set(value) { 
          this.$store.state.githubToken = value;
        }
      },
      owner: {
        get() {
          return this.$store.state.githubData.owner;
        },
        set(value) { 
          this.$store.state.githubData.owner = value;
        }
      },
      updated() {
        window.componentHandler.upgradeDom();
      }
    }
  }
</script>
