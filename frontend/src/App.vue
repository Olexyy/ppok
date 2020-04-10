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
  </div>
</template>

<script>
  import Main from './components/Main.vue'

  export default {
    name: 'App',
    components: {
      Main
    },
    mounted() {
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
			var nameItem = $('#name');
			var changeName = $("#change_name");
			var discussItem = $('#discuss');
			var timerItem = $('#timer');
			var storeName = localStorage.getItem('pocker_name');
			var dialogName = document.getElementById('name_dialog');
			var dialogError = document.getElementById('error_dialog');
			var dialogStart = document.getElementById('start_dialog');
			var discuss = false;
			var timer = null;
			nameItem.val(storeName);
			dialogPolyfill.registerDialog(dialogName);
			dialogPolyfill.registerDialog(dialogError);
			dialogPolyfill.registerDialog(dialogStart);
			dialogStart.showModal();
			changeName.on('click', function() {
				dialogName.showModal();
			});
			discussItem.on('click', function() {
				if ($(this).text() === 'Start discussion') {
					socket.emit('discuss', $this.$store.state.room, 'discuss');
				}
				else if ($(this).text() === 'Stop discussion') {
					socket.emit('discuss', $this.$store.state.room, 'result');
				}
				else {
					socket.emit('clear', $this.$store.state.room);
				}
			});
			nameItem.on('blur keypress', function(e) {
        		if (e.type !== 'keypress' || e.keyCode === 13) {
					if ($(this).val()) {
						localStorage.setItem('pocker_name', $(this).val());
						socket.emit('update', $this.$store.state.room, 'name', $(this).val());
						dialogName.close();
					}
				}
			});
			socket.on('connect', function(){
				dialogStart.close();
				if (storeName) {
					socket.emit('update', $this.$store.state.room, 'name', storeName);
				}
				else {
					dialogName.showModal();
				}
			});
			socket.on('error', function() {
				dialogError.showModal();
			});
			socket.on('disconnect', function() {
				dialogError.showModal();
			});
			socket.on('status', function(data) {
				$this.$store.dispatch('setInstance', data).then(() => {
					if ($this.$store.state.discuss === 'discuss' || $this.$store.state.discuss === 'result') {
						if ($this.$store.state.discuss === 'discuss') {
							discussItem.text('Stop discussion');
							if (!timer) {
								timer = {sec: 0, getSec: function() {
									var timeObj = new Date(null);
									timeObj.setSeconds(this.sec);
									return timeObj.getUTCMinutes() + ':' + timeObj.getUTCSeconds();
								}};
								var handle = setInterval(function() {
									if (!timer) {
										clearInterval(handle);
									} else {
										timer.sec += 1;
										timerItem.text(timer.getSec());
									}
								}, 1000);
							}
						}
						if (!$this.$store.state.anyUnvoted || $this.$store.state.discuss == 'result') {
							if (timer) {
								timer = null;
							}
							discussItem.text('Clear data');
						}
					} else { // state idle
						discussItem.text('Start discussion');
						if (timer) {
							timer = null;
						}
						timerItem.text('');
					}
					discussItem.attr('disabled', !$this.$store.state.topic);
				});
			});
			const liveness = () => {
				setTimeout(function() {
					$this.$store.state.socket.emit('liveness');
					liveness();
				}, 30000);
			}
			liveness();
		});
    }
  }
</script>

<style lang="scss">
  @import "./styles/_global.scss";
</style>
