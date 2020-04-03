jQuery(document).ready(function($) {
  const socket = io('/pocker', {
    transportOptions: {
            polling: {
            extraHeaders: {
                'Authorization': 'Bearer abc',
            },
            },
        },
    });
    var countItem = $('#count');
    var tableItems = $('#table_body');
    var topicItem = $('#topic');
    var nameItem = $('#name');
    var changeName = $("#change_name");
    var discussItem = $('#discuss');
    var timerItem = $('#timer');
    var discuss;
    var timer;
    var storeName = localStorage.getItem('pocker_name');
    var cards = $('.mdl-card-pocker-card');
    nameItem.val(storeName);
    var dialog = document.querySelector('dialog');
    var statusObject;
    dialogPolyfill.registerDialog(dialog);
    if (storeName) {
        socket.emit('update', 'name', storeName);
    }
    topicItem.on('blur', function() {
        socket.emit('topic', $(this).val());
    });
    changeName.on('click', function() {
        dialog.showModal();
    });
    discussItem.on('click', function() {
        if ($(this).text() === 'Start discussion') {
            socket.emit('discuss', true);
        }
        else {
            socket.emit('clear');
        }
    });
    nameItem.on('blur', function() {
        if ($(this).val()) {
            localStorage.setItem('pocker_name', $(this).val());
            socket.emit('update', 'name', $(this).val());
            dialog.close();
        }
    });
    cards.on('click', function() {
        if (discuss) {
            socket.emit('update', 'vote', $(this).data('value'));
            console.log('trigger vote');
        }
    });

    socket.on('status', function(data) {
        statusObject = data;
        discuss = data.discuss;
        tableItems.empty();
        var ownId = socket.id;
        var anyUnvoted = false;
        cards.prop('disabled', false);
        if (data.players[ownId].vote !== '') {
            cards.each(function(){
                if ($(this).data('value') === data.players[ownId].vote) {
                    $(this).prop('disabled', true);
                }
            });
        }
        // If discuss we need to show statistics if everybody voted.
        if (discuss) {
            // Negotiate any unvoted if in discuss
            Object.keys(data.players).forEach(function(id) {
                if(data.players[id].vote == '') {
                    anyUnvoted = true;
                }          
            });
        }
        
        Object.keys(data.players).forEach(function(id, i) {
            const tr =  $("<tr></tr>");
            
            var vote = data.players[id].vote;
            tr.append(
                $('<td></td>').addClass('width-fixed-50').text(((i+1).toString()))
            );
            tr.append(
                $('<td></td>').addClass('width-minus-100').text(data.players[id].name)
            )
            if (vote === '') {
                anyUnvoted = true;
                if (discuss) {
                    tr.append(
                        $('<td></td>').addClass('width-fixed-50').html('<img class="wait-throbber" src="/assets/waiting.gif"></img>')
                    )
                }
                else {
                    tr.append(
                        $('<td></td>').addClass('width-fixed-50').html(data.players[id].vote)
                    )
                }
            }
            else {
                if (discuss && anyUnvoted) {
                    tr.append(
                        $('<td></td>').addClass('width-fixed-50').html('<span class="material-icons">done</span>')
                    )
                }
                else {
                    tr.append(
                        $('<td></td>').addClass('width-fixed-50').text(data.players[id].vote)
                    )
                }
            }
            tableItems.append(tr);
        });
        topicItem.val(data.topic).trigger('change');
        data.topic ? topicItem.parent().addClass('is-dirty') : topicItem.parent().removeClass('is-dirty');
        if (!localStorage.getItem('pocker_name')) {
            dialog.showModal();
        }
        componentHandler.upgradeDom();
        if (discuss) {
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
        } else {
            if (timer) {
                timer = null;
                timerItem.text('');
            }
            discussItem.text('Start discussion');
            discussItem.attr('disabled', !topicItem.val());
        }
        if (discuss && !anyUnvoted) {
            if (timer) {
                timer = null;
            }
            discussItem.text('Clear data');
        } else {
            timerItem.text('');
        }
    });

});
