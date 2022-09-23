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
          <div class="mdl-card__actions mdl-card--border">
            <a id="change_name" v-on:click="onChangeNameClick" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Change name
            </a>
<!--            <a id="play_sound" v-on:click="playSound" class="mdl-button mdl-button&#45;&#45;colored mdl-js-button mdl-js-ripple-effect">-->
<!--              Play sound-->
<!--            </a>-->
            <a v-if="voting" id="set_voting" v-on:click="setUnVoting" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Not voting
            </a>
            <a v-else id="set_voting" v-on:click="setVoting" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Voting
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
  export default {
    name: 'Main',
    components: {
      Users,
      Cards,
      Topic,
      Menu
    },
    computed: {
      room() {
        return this.$store.state.app.room;
      },
      voting() {
        return this.$store.state.app.voting;
      }
    },
    methods: {
      onChangeNameClick() {
        this.$store.state.dialogs.change.showModal();
      },
      playSound() {
        this.$store.state.app.emit('trigger', 'sound');
      },
      setVoting() {
        this.$store.state.app.emit('update', { vote: '', voting: true});
      },
      setUnVoting() {
        this.$store.state.app.emit('update', { vote: '', voting: false});
      }
    }
  }
</script>
