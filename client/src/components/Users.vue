<template>
  <div class="mdl-grid mdl-cell mdl-cell--12-col">
    <table id="table" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
      <thead>
        <tr>
          <th class="width-fixed-50">№</th>
          <th class="width-minus-100">Name</th>
          <th class="width-fixed-50">Vote</th>
        </tr>
      </thead>
      <tbody v-if="instance" id="table_body">
        <tr v-for="(player, id, i) in instance.players" :key="`ind-${id}-${i}`">
          <td class="width-fixed-50">{{ i + 1 }}</td>
          <td v-if="player.repoConnect" class="width-minus-100">{{ player.name }}(connected repo)</td>
          <td v-else class="width-minus-100">{{ player.name }}</td>
          <td v-if="player.vote === '' && discuss === 'discuss'" class="width-fixed-50">
            <img class="wait-throbber" src="./../assets/waiting.gif"/>
          </td>
          <td v-else-if="discuss === 'discuss' && anyUnvoted" class="width-fixed-50">
            <span class="material-icons">done</span>
          </td>
          <td v-else class="width-fixed-50">
            {{player.vote}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Users',
    computed: {
			instance() {
				return this.$store.state.instance;
      },
      anyUnvoted() {
				return this.$store.state.anyUnvoted;
      },
      discuss() {
				return this.$store.state.discuss;
      },
    },
  }
</script>
