<template>
  <div class="mdl-grid mdl-cell mdl-cell--12-col">
    <button :disabled="vote === '0.5' || !canBeEnabled" v-on:click="onClick" data-value="0.5" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      1/2
    </button>
    <button :disabled="vote === '1' || !canBeEnabled" v-on:click="onClick" data-value="1" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      1
    </button>
    <button :disabled="vote === '2' || !canBeEnabled" v-on:click="onClick" data-value="2" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      2
    </button>
    <button :disabled="vote === '3' || !canBeEnabled" v-on:click="onClick" data-value="3" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      3
    </button>
    <button :disabled="vote === '5' || !canBeEnabled" v-on:click="onClick" data-value="5" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      5
    </button>
    <button :disabled="vote === '8' || !canBeEnabled" v-on:click="onClick" data-value="8" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      8
    </button>
    <button :disabled="vote === '13' || !canBeEnabled" v-on:click="onClick" data-value="13" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      13
    </button>
    <button :disabled="vote === '20' || !canBeEnabled" v-on:click="onClick" data-value="20" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      20
    </button>
    <button :disabled="vote === '40' || !canBeEnabled" v-on:click="onClick" data-value="40" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      40
    </button>
    <button :disabled="vote === '100' || !canBeEnabled" v-on:click="onClick" data-value="100" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      100
    </button>
    <button :disabled="vote === '?' || !canBeEnabled" v-on:click="onClick" data-value="?" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      ?
    </button>
    <button :disabled="vote === 'break' || !canBeEnabled" v-on:click="onClick" data-value="break" class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
        <span style="font-size: 32px" class="material-icons">coffee</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Cards',
    methods: {
      onClick(e) {
        if (this.canBeEnabled) {
          const el = e.target;
          const value = el.getAttribute('data-value');
          this.$store.state.app.emit('update', {vote: value});
        }
      }
    },
    computed: {
      vote() {
        return this.$store.state.app.vote;
      },
      canBeEnabled() {
				return this.$store.state.app.discuss === 'discuss' && this.$store.state.app.anyUnvoted && this.$store.state.app.voting;
      }
    }
  }
</script>
