<template>
  <div class="mdl-cell mdl-cell--4-col">
    <table id="table" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
      <thead>
        <tr>
          <th class="width-fixed-50">№</th>
          <th class="width-minus-100">Name</th>
        </tr>
      </thead>
      <tbody v-if="instance" id="table_body">
        <tr v-for="(player, id, i) in instance.users" :key="`ind-${id}-${i}`">
          <td class="width-fixed-50">{{ i + 1 }}</td>
          <td class="width-minus-100">{{ player.name ? player.name : '[connecting]' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Chat',
    methods: {
      isOnline(uuid) {
        return this.$store.state.app.isOnline(uuid);
      },
      kick(e) {
        const uuid = e.target.getAttribute('data-uuid');
        this.$store.state.app.emit('kick', uuid);
      }
    },
    computed: {
			instance() {
				return this.$store.state.app.data;
      },
      app() {
        return this.$store.state.app;
      },
      anyUnvoted() {
				return this.$store.state.app.anyUnvoted;
      },
      discuss() {
        return this.$store.state.app.discuss;
      },
      average() {
        return this.$store.state.app.result.average;
      },
      recommended() {
        return this.$store.state.app.result.recommended;
      },
      su() {
        return this.$store.state.app.isSU();
      },
    },
  }
</script>
