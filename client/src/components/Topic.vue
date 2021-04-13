<template>
  <div class="mdl-grid mdl-cell mdl-cell--12-col">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--11-col">
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
    <button
      :disabled="!validTopic"
      v-on:click="onReferenceClick"
      class="mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col">
      <span class="material-icons" style="font-size: 32px;">open_in_new</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Topic',
    methods: {
      validUrl(string) {
        try {
          new URL(string);
        } catch (_) {
          return false;
        }
        return true;
      },
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
        this.$store.state.app.emit('update', {}, {topic: e.target.value});
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
      onReferenceClick() {
        const topic = this.$store.state.app.topic;
        if (topic && this.validUrl(topic)) {
          const win = window.open(topic, '_blank');
          win.focus();
        }
      }
    },
    computed: {
      room() {
        return this.$store.state.app.room;
      },
      topic: {
        get() {
          const el = document.getElementById('topic');
          if (el) {
            this.handleClasses(document.getElementById('topic'), this.$store.state.app.topic);
          }
          return this.$store.state.app.topic;
        },
        set() { }
      },
      validTopic() {
        return this.$store.state.app.topic && this.validUrl(this.$store.state.app.topic);
      }
    },
  }
</script>
