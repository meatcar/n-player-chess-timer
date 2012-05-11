$(document).ready(function() {
    var players = { 1: {name: 'Denys', time:60, toutid:null, active:true}, 
                    2: {name: 'Serg', time:60, toutid:null, active:false}, 
                    3: {name: 'Viktor', time:60, toutid:null, active:false} 
    } 
        , next = function(i) {
            // i is the player id
            var player = players[i];
            if (!player.active) {
                return;
            }
            player.time--;
            if (player.time == 0) 
                $('#player' + i).
        };

    for (var i in players) {
        var player = $('#player' + i);
        $('.name', player).text(players[i].name);
        $('.time', player).text(players[i].time);
        setTimeout(next, 1000, i);
    }

    $('body').click(function(event) {
        // stop current timer
        // star the next timer
    });

});
