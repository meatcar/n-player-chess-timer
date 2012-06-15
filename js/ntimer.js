var players, /* list of players */
    cur, /* current player id */
    timeout,
    paused;

/*
 * Check the whether there is only 1 non-timed out player left.
 */
function endGame() {
    var i, count = 0;
    for (i = players.length; i--;) {
        if (!players[i].tout)
            count++;
    }
    if (count == 1) {
        clearTimeout(timeout);
        paused = true;
    }
    return count == 1;
}

function doClock() {
    var player = players[cur],
        newtime,
        div;
    player.current++;
    newtime = player.getTime();
    div = $('#player' + cur + ' .time');
    div.text(newtime);
    timeout = setTimeout(doClock, 1000);
    // if the player ran out of time.
    if (player.current >= player.total) {
        $('#player' + cur).removeClass('btn-success').addClass('btn-danger');
        player.tout = true;
        next();
    }
}

function pause() {
    if (paused && players != null && players.length > 0) {
        paused = false;
        timeout = setTimeout(doClock, 1000);
    } else {
        clearTimeout(timeout);
        timeout = null;
        paused = true;
    }
    $('button#pause').blur();
}
function next() {
    var old;

    if (paused || players == null || players.length == 0 || endGame())
        return;

    $('#player' + cur).removeClass('btn-success');

    // increment cur untill next non-timed out one is found.
    old = cur;
    cur = (cur + 1) % players.length;
    while (old !== cur) {
        if (!players[cur].tout) {
            break;
        }
        cur = (cur + 1) % players.length;
    }
    
    highlightCurrentPlayer();
    endGame();
}

function highlightCurrentPlayer() {
    $('#player' + cur).addClass('btn-success');
}

function parsePlayers() {
    players = [];
    $('tr').each(function () {
        var name, hours, mins, secs;
        name = $(this).find('input[name="name"]').val();

        hours = Number($(this).find('input[name="hours"]').val());
        mins = Number($(this).find('input[name="minutes"]').val());
        secs = Number($(this).find('input[name="seconds"]').val());
        if (name != null && typeof(name) !== 'undefined') {
            players.push(new Player(name,(hours * 3600) + (mins * 60) + secs));
        }
    });
    $('#customize').modal('hide');
    makeTimers();
}

function makeTimers() {
    var i, div, player, name, time;
    clearTimeout(timeout);
    timeout = null;
    $('#timers').empty();

    if (players == null || players.length == 0)
        return; 
    
    for (i = 0; i < players.length; i++) {
        div = $(document.createElement('div'))
            .addClass('btn player disabled').attr('id', 'player'+ i);
        player = players[i];
        player.current = 0;
        player.tout = false;
        name = $(document.createElement('p'))
            .addClass('name')
            .text(player.name);
        time = $(document.createElement('h1'))
            .addClass('time')
            .text(player.getTime());
        div.append(name);
        div.append(time);
        $('#timers').append(div);
    }
    // start the clocks!
    cur = 0;
    highlightCurrentPlayer();
}

/*
 * Add a new row for player info in the modal dialog
 */
function addTablePlayer() {
    var tr, name, hours, mins, secs;
    tr = $(document.createElement('tr'));
    name = $(document.createElement('input')).attr({
            type: 'text',
            name: 'name',
            placeholder: 'Name'
    }).addClass('form-inline');
    hours = $(document.createElement('input')).attr({
            type: 'text',
            name: 'hours',
            placeholder: 'h',
    }).addClass('form-inline timefield');
    mins = $(document.createElement('input')).attr({
            type: 'text',
            name: 'minutes',
            placeholder: 'm',
    }).addClass('form-inline timefield');
    secs = $(document.createElement('input')).attr({
            type: 'text',
            name: 'seconds',
            placeholder: 's',
    }).addClass('form-inline timefield');
    tr.append($(document.createElement('td')).append(name));
    tr.append($(document.createElement('td')).append(hours));
    tr.append($(document.createElement('td')).append(mins));
    tr.append($(document.createElement('td')).append(secs));
    $('tbody').append(tr);
}

/*
 * Add a new row for player info in the modal dialog
 */
function rmTablePlayer() {
    $('tbody tr:last-child').remove();
}

function enableNextOnKey() {
    $('body').keypress(next);
}

function disableNextOnKey() {
    $('body').unbind();
}

$(document).ready(function() {
    var i, tr, namecol, time, name, hours, mins, secs;
    $('button#restart').click(makeTimers);
    $('button#pause').click(pause);
    $('button#addplayer').click(addTablePlayer);
    $('button#rmplayer').click(rmTablePlayer);
    $('button#save').click(parsePlayers);
    paused = true;

    enableNextOnKey();
});
