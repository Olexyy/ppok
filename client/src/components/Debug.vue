<template>
    <div style="max-height: 300px;" class="debug" v-if="isDebug">
      <pre>{{stringifyApp}}</pre>
    </div>
</template>

<script>
  export default {
    name: 'Debug',
    computed: {
      isDebug() {
        return this.$store.state.app.isDebug();
      },
      stringifyApp() {
        return JSON.stringify(this.$store.state.app.toJson(), null, 2);
      },
    }
  }
</script>
