function Player(nameT, secondsT) {
    var that = this;
    
    /* name of the player */
    this.name = nameT;
    /* total time allocated for the player, in seconds. */
    this.total = secondsT;
    /* total time used by the player */
    this.current = 0;
    /* whether this player has timed out */
    this.timedout = false;

    /*
     * Return the clock string representing this number of seconds.
     */
    this.getTime = function() {
        var remaining, hours, mins, secs;
        remaining = that.total - that.current;
        hours = Math.floor(remaining / 3600);
        remaining = remaining % 3600;
        mins = Math.floor(remaining / 60);
        secs = remaining % 60;
        return hours + ':' + mins + ':' + secs;
    };

}
