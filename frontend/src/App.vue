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
		<dialog class="mdl-dialog" id="name_dialog">
			<h4 class="mdl-dialog__title">Name yourself</h4>
			<div class="mdl-dialog__content">
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
				<input 
					v-model="userName"
					v-on:blur="onBlur"
					v-on:keypress="onKeyPress"
					class="mdl-textfield__input"
					type="text"
					id="name"
					name="name">
				<label class="mdl-textfield__label" for="Name">Name...</label>
				</div>
			</div>
		</dialog>
		<dialog class="mdl-dialog" id="start_dialog">
			<h4 class="mdl-dialog__title">Starting</h4>
			<div class="mdl-dialog__content">
				<p>
				Please wait for connection.
				</p>
			</div>
		</dialog>
		<dialog class="mdl-dialog" id="error_dialog">
			<h4 class="mdl-dialog__title">Error</h4>
			<div class="mdl-dialog__content">
				<p>
				Something went wrong, try reload page.
				</p>
			</div>
		</dialog>
  </div>
</template>

<script>
  import Main from './components/Main.vue'
  let dialogName = null;
  let dialogError = null;
  let dialogStart = null;
  export default {
    name: 'App',
    components: {
      Main
    },
    mounted() {
		// TODO DIALOGS TO GLOBAL.
		dialogName = document.getElementById('name_dialog');
		dialogError = document.getElementById('error_dialog');
      	dialogStart = document.getElementById('start_dialog');
      	window.dialogPolyfill.registerDialog(dialogName);
		window.dialogPolyfill.registerDialog(dialogError);
		window.dialogPolyfill.registerDialog(dialogStart);
		dialogStart.showModal();
		const $this = this;
		let match = window.location.pathname.match(/\/room\/(.+)/);
		let room = null;
		if (!match || match.length !== 2) {
			room = 'default';
		} else {
			room =  match[1];
		}
		this.$store.dispatch('setRoom', room).then(() => {
			var socket = window.io('/pocker', {
				transports: ['websocket'],
				upgrade: false
			});
			this.$store.dispatch('setSocket', socket);
			window.addEventListener('unload', () => {
				if (socket) socket.close();
			});
			socket.on('connect', function(){
				// TODO GLOBAL STORAGE
				document.getElementById('start_dialog').close();
				var storeName = window.localStorage.getItem('pocker_name');
				if (storeName) {
					socket.emit('update', $this.$store.state.room, 'name', storeName);
				}
				else {
					// TODO GLOBAL STORAGE
					document.getElementById('name_dialog').showModal();
				}
			});
			socket.on('error', function() {
				dialogError.showModal();
			});
			socket.on('disconnect', function() {
				dialogError.showModal();
			});
			socket.on('status', function(data) {
				$this.$store.dispatch('setInstance', data);
			});
			const liveness = () => {
				setTimeout(function() {
					socket.emit('liveness');
					liveness();
				}, 30000);
			}
			liveness();
		});
	},
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
        if (e.target.value) {
          window.localStorage.setItem('pocker_name', e.target.value);
          this.$store.state.socket.emit('update', this.$store.state.room, 'name', e.target.value);
          document.getElementById('name_dialog').close();
		}
      },
	},
	computed: {
		userName: {
			get() {
				return this.$store.state.userName;
			},
			set(value) { }
        }
	}
  }
</script>

<style lang="scss">
  @import "./styles/_global.scss";
</style>
