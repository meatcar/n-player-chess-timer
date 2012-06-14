var players, /* list of players */
    cur, /* current player id */
    timeout;

/*
 * Return the clock string representing this number of seconds.
 */
function getTime(player) {
    var remaining, hours, mins, secs;
    remaining = player.total - player.used;
    hours = Math.floor(remaining / 3600);
    remaining = remaining % 3600;
    mins = Math.floor(remaining / 60);
    secs = remaining % 60;
    return hours + ':' + mins + ':' + secs;
}

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
    }
    return count == 1;
}

function next() {
    if (timeout == null || players == null || players.length == 0 || endGame())
        return;

    $('#player' + cur).removeClass('btn-success');

    // increment cur untill next non-timed out one is found.
    cur = (cur + 1) % players.length;
    while (players[cur].tout)
        cur = (cur + 1) % players.length;
    
    $('#player' + cur).addClass('btn-success');
}

function doClock() {
    var player = players[cur],
        newtime,
        div;
    player.used++;
    newtime = getTime(player);
    div = $('#player' + cur + ' .time');
    div.text(newtime);
    timeout = setTimeout(doClock, 1000);
    // if the player ran out of time.
    if (player.used >= player.total) {
        $('#player' + cur).removeClass('btn-success').addClass('btn-danger');
        player.tout = true;
        next();
    }
}

function initTimers() {
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
        player.used = 0;
        player.tout = false;
        name = $(document.createElement('p'))
            .addClass('name')
            .text(player.name);
        time = $(document.createElement('h1'))
            .addClass('time')
            .text(getTime(player));
        div.append(name);
        div.append(time);
        $('#timers').append(div);
    }
    // start the clocks!
    cur = -1;
    next();
}

function pause() {
    if (timeout == null && players != null && players.length > 0) {
        timeout = setTimeout(doClock, 1000);
    } else {
        clearTimeout(timeout);
        timeout = null;
    }
}

function parsePlayers() {
    players = [];
    $('tr').each(function () {
        var name, hours, mins, secs;
        name = $(this).find('input[name="name"]').val();
        hours = $(this).find('input[name="hours"]').val() - 0;
        mins = $(this).find('input[name="minutes"]').val() - 0;
        secs = $(this).find('input[name="seconds"]').val() - 0;
        if (name != null && typeof(name) !== 'undefined') {
            players.push({
                name: name,
                total: (hours * 3600) + (mins * 60) + secs,
                used: 0,
                tout: false
            });
        }
    });
    $('#customize').modal('hide');
    initTimers();
}

/*
 * Add a new row for player info in the modal dialog
 */
function addTablePlayer() {
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
    $('button#restart').click(initTimers);
    $('button#pause').click(pause);
    $('button#addplayer').click(addTablePlayer);
    $('button#rmplayer').click(rmTablePlayer);
    $('button#save').click(parsePlayers);

    enableNextOnKey();
});
