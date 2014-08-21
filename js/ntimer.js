(function (window, document, $) {
    "use strict";

    function debounce(fn, time) {
        var last_bounce = Date.now();
        time = time || 250;
        return function () {
            var now = Date.now();

            if (now - last_bounce > time) {
                last_bounce = now;
                fn();
            }
        };
    }


    /**
     * A Player, with a name and a number of seconds on the clock.
     */
    function Player(name, seconds) {
        var that = this;

        /* name of the player */
        this.name = name;
        /* total time allocated for the player, in seconds. */
        this.total = seconds;
        /* total time used by the player */
        this.current = 0;
        /* whether this player has timed out */
        this.timedout = false;

    }

    /**
     * Return the clock string representing this number of seconds.
     */
    Player.prototype.getTime = function() {
        var remaining, hours, mins, secs;
        remaining = this.total - this.current;
        hours = Math.floor(remaining / 3600);
        remaining = remaining % 3600;
        mins = Math.floor(remaining / 60);
        secs = remaining % 60;
        return hours + ':' + mins + ':' + secs;
    };


    /**
     * Da Game. Responsible for managing player's times, drawing them to the
     * screen, and catching clicks.
     */
    function Game(players) {
        this.players = players || [];
        this.cur = null; /* current player id */
        this.timeout = null;
        this.paused = true;

        this.bindClicks({
            '#restart': 'makeTimers',
            '#pause': 'pause',
            '#addplayer': 'addTablePlayer',
            '#rmplayer': 'rmTablePlayer',
            '#save': 'parsePlayers'
        });
        this.enableNextOnKey();
    }

    /**
     * Bind to all the events.
     */
    Game.prototype.bindClicks = function (events) {
        for (var e in events) {
            $(e).click(this[events[e]].bind(this));
        }
    };

    /*
     * Check the whether there is only 1 non-timed out player left.
     */
    Game.prototype.endGame = function() {
        var i, count = 0;
        for (i = this.players.length; i--;) {
            if (!this.players[i].timedout) {
                count++;
            }
        }
        if (count == 1) {
            this.pause();
        }
        return count == 1;
    };

    Game.prototype.doClock = function() {
        var player = this.players[this.cur],
            newtime,
            div;
        player.current++;
        newtime = player.getTime();
        div = $('#player' + this.cur + ' .time');
        div.text(newtime);
        this.timeout = setTimeout(this.doClock.bind(this), 1000);
        // if the player ran out of time.
        if (player.current >= player.total) {
            $('#player' + this.cur).removeClass('btn-success').addClass('btn-danger');
            player.timedout = true;
            this.next();
        }
    };

    Game.prototype.pause = function() {
        if (this.paused && this.players !== null && this.players.length > 0) {
            this.paused = false;
            this.timeout = setTimeout(this.doClock.bind(this), 1000);
        } else {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.paused = true;
        }
        $('button#pause').blur();
    };

    Game.prototype.enableNextOnKey = function() {
        $('body').keypress(debounce(this.next.bind(this), 250));
    };

    Game.prototype.disableNextOnKey = function() {
        $('body').unbind();
    };

    Game.prototype.next = function() {
        var old;

        if (this.paused || this.players === null || this.players.length === 0 || this.endGame())
            return;

        $('#player' + this.cur).removeClass('btn-success');

        // increment cur untill next non-timed out one is found.
        old = this.cur;
        var cur = this.cur + 1;
        cur = cur % this.players.length;
        while (old !== cur) {
            if (!this.players[cur].timedout) {
                break;
            }
            cur = (cur + 1) % this.players.length;
        }
        this.cur = cur;

        this.highlightCurrentPlayer();
        this.endGame();
    };

    Game.prototype.highlightCurrentPlayer = function() {
        $('#player' + this.cur).addClass('btn-success');
    };

    Game.prototype.parsePlayers = function() {
        var players = [];
        $('tr').each(function () {
            var name, hours, mins, secs;
            name = $(this).find('input[name="name"]').val();

            hours = Number($(this).find('input[name="hours"]').val());
            mins = Number($(this).find('input[name="minutes"]').val());
            secs = Number($(this).find('input[name="seconds"]').val());
            if (name !== null && typeof(name) !== 'undefined') {
                players.push(new Player(name,(hours * 3600) + (mins * 60) + secs));
            }
        });
        $('#customize').modal('hide');

        this.players = players;
        this.makeTimers();
    };

    Game.prototype.makeTimers = function() {
        var i, div, player, name, time;
        clearTimeout(this.timeout);
        this.timeout = null;
        $('#timers').empty();

        if (this.players === null || this.players.length === 0)
            return;


        for (i = 0; i < this.players.length; i++) {
            div = $(document.createElement('div'))
                .addClass('btn player disabled').attr('id', 'player'+ i);
            player = this.players[i];
            player.current = 0;
            player.timedout = false;
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
        this.cur = 0;
        this.highlightCurrentPlayer();
    };

    /*
     * Add a new row for player info in the modal dialog
     */
    Game.prototype.addTablePlayer = function() {
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
    };

    /*
     * Add a new row for player info in the modal dialog
     */
    Game.prototype.rmTablePlayer = function() {
        $('tbody tr:last-child').remove();
    };

    $(document).ready(function() {
        window.game = new Game();
    });

})(window, document, $);
