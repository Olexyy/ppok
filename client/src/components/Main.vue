<template>
    <main class="mdl-layout__content">
    <div class="page-content">
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
          <Topic/>
          <Cards/>
          <Users/>
          <Repo/>
          <div class="mdl-card__actions mdl-card--border">
            <a v-on:click="onChangeNameClick" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Change name
            </a>
            <a v-if="repoConnect && !iAmRepoConnect" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              disabled="true">
              Repo connected
            </a>
            <a v-else class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              v-on:click="onConnectRepoClick">
              Connect repo
            </a>
          </div>
          <Menu/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import Users from './Users.vue'
  import Cards from './Cards.vue'
  import Topic from './Topic.vue'
  import Menu from './Menu.vue'
  import Repo from './Repo.vue'
  export default {
    name: 'Main',
    components: {
      Users,
      Cards,
      Topic,
      Menu,
      Repo
    },
    computed: {
      room() {
        return this.$store.state.room;
      },
      repoConnect() {
        return this.$store.state.repoConnect;
      },
      iAmRepoConnect() {
        return this.$store.state.iAmRepoConnect;
      }
    },
    methods: {
      onChangeNameClick(e) {
        this.$store.state.dialogs.name.showModal();
      },
      onConnectRepoClick(e) {
        this.$store.state.dialogs.repo.showModal();
      },
    }
  }
</script>
