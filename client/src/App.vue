<template>
  	<div id="app">
        <!-- Always shows a header, even in smaller screens. -->
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
			<div class="mdl-layout__header-row">
				<!-- Title -->
				<span class="mdl-layout-title">TM Card Planning Pocker</span>
				<!-- Add spacer, to align navigation to the right -->
				<div class="mdl-layout-spacer"></div>
				<!-- Navigation. We hide it in small screens. -->
				<nav class="mdl-navigation mdl-layout--large-screen-only">
				<!--a class="mdl-navigation__link" href="">Link</a-->
				</nav>
			</div>
			</header>
			<div class="mdl-layout__drawer">
			<span class="mdl-layout-title">TMCPP</span>
			<nav class="mdl-navigation">
				<!--a class="mdl-navigation__link" href="">Link</a-->
			</nav>
			</div>
        	<Main/>
    	</div>
		<dialogs/>
  </div>
</template>

<script>
  import Main from './components/Main.vue'
  import Dialogs from './components/Dialogs.vue'
  export default {
    name: 'App',
    components: {
	  Main,
	  Dialogs
    },
    mounted() {
		this.$store.state.dialogs.start.showModal();
		this.$store.dispatch('initRoom').then(() => {
			this.$store.dispatch('initSocket');
		});
	},
  }
</script>

<style lang="scss">
  @import "./styles/_global.scss";
</style>
