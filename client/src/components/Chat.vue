<template>
  <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--6-col-phone">
    <div class="mdl-grid">
      <table id="table" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col">
        <thead>
          <tr>
            <th class="width-fixed-50">User</th>
            <th class="width-minus-100">Details</th>
          </tr>
        </thead>
        <tbody v-if="chat.length" id="table_body">
          <tr v-for="(item, i) in chat" :key="`ind-${i}`">
            <td class="width-fixed-50">{{ item.user }}</td>
            <td class="width-minus-100">{{ item.details }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mdl-grid">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--6-col-phone">
        <input
            v-on:keypress="onKeyPress"
            v-on:change="onChange"
            class="mdl-textfield__input"
            type="text"
            id="topic"
            name="topic" style="margin-bottom: 7px;">
        <label class="mdl-textfield__label" for="topic">Topic...</label>
      </div>
<!--      <button style="margin: 20px 0 20px 0; padding: 0 5px 0 5px; min-width: 24px;"-->
<!--              :disabled="isDisabled"-->
<!--              v-on:click="onClick"-->
<!--              class="mdl-button mdl-shadow&#45;&#45;2dp mdl-cell mdl-cell&#45;&#45;2-col mdl-cell&#45;&#45;1-col-tablet mdl-cell&#45;&#45;1-col-phone">-->
<!--        <span class="material-icons" style="font-size: 24px;">upgrade</span>-->
<!--      </button>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Chat',
    computed: {
      chat() {
        return this.$store.state.app.chat.reverse().slice(0, 10).reverse();
      },
    },
    methods: {
      onKeyPress(e) {
        if (e.keyCode === 13) {
          this.handleEvent(e);
          e.target.blur();
          e.target.parentNode.classList.remove('is-focused');
          e.target.parentNode.classList.remove('is-dirty');
          e.target.value = null;
        }
      },
      handleEvent(e) {
        const chat = this.$store.state.app.chat;
        chat.push({
          user: this.$store.state.app.userName,
          details: e.target.value,
        });
        this.$store.state.app.emit('update', {}, {chat: chat});
      },
      onChange(e) {
        this.handleClasses(e.target, e.target.value);
      },
      handleClasses(el, value) {
        if (value) {
          el.parentNode.classList.add('is-dirty');
        }
        else {
          el.parentNode.classList.remove('is-dirty');
        }
      },
    }
  }
</script>
