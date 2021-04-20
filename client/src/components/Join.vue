<template>
  <div class="mdl-grid mdl-cell mdl-cell--12-col">
    <div class="mdl-card__supporting-text">
      Choose room from existing or create new.
    </div>
    <div class="mdl-card__supporting-text">
      Select room:<br/>
      <a v-for="(item, name, i) in rooms" :href="`/room/${name}`" :key="`${name}-${i}`" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">{{`${name} (${item.users})`}}</a>
    </div>
    <div class="mdl-card__supporting-text">
      New room:<br/>
      <a :href="'room/'+ uuid" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">{{uuid}}</a>
    </div>
    <div class="mdl-card__supporting-text">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input
            v-on:blur="onBlurRoom"
            v-on:keypress="onKeyPressRoom"
            class="mdl-textfield__input"
            type="text"
            data-ref="room"
            id="room"
            name="room">
        <label class="mdl-textfield__label" for="room">Custom room ...</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Join',
    methods: {
      onBlurRoom(e) {
        this.handleEventRoom(e);
      },
      onKeyPressRoom(e) {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
          this.handleEventRoom(e);
          e.target.blur();
          e.target.parentNode.classList.remove('is-focused');
        }
      },
      handleEventRoom(e) {
        const room = e.target.value;
        if (room) {
          if (!room.length) {
            e.target.parentNode.classList.add('is-invalid');
          }
          if (Object.keys(this.$store.state.app.rooms).includes(room)) {
            e.target.parentNode.classList.add('is-invalid');
          }
          else {
            e.target.parentNode.classList.remove('is-invalid');
            window.location.href = `/room/${room}`;
          }
        }
      },
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
      rooms() {
        return Object.keys(this.$store.state.app.rooms).slice(0,5).reduce((obj, key) => {
          obj[key] = this.$store.state.app.rooms[key];
          return obj;
        }, {});
      },
      uuid() {
        return this.$store.state.app.generateUuid();
      },
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
