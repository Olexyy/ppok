<template>
  <div class="mdl-grid mdl-cell mdl-cell--12-col">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
      <input 
        v-model="topic"
        v-on:blur="onBlur"
        v-on:keypress="onKeyPress"
        v-on:change="onChange"
        class="mdl-textfield__input"
        type="text"
        id="topic"
        name="topic">
      <label class="mdl-textfield__label" for="topic">Topic...</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Topic',
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
        this.$store.state.socket.emit('topic', this.$store.state.room, e.target.value);
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
      }
    },
    computed: {
      room() {
        return this.$store.state.room;
      },
      topic: {
        get() {
          const el = document.getElementById('topic');
          if (el) {
            this.handleClasses(document.getElementById('topic'), this.$store.state.topic);
          }
          return this.$store.state.topic;
        },
        set(value) { }
      }
    },
  }
</script>
