<template>
  <div class="timer" :class="{'timer-edit': edit}" @mouseover.self="showActions" @mouseout.self="hideActions" tabindex=0>
    <!-- <div class="id">{{timer.id}}</div> -->
    <template v-if="edit">
      <div class="name">
        <input type="text" name="name" placeholder="Name" :value="name" @input="setName" @keyup.enter="toggleEditTimer({id})"/>
      </div>
      <div class="time">
        <input type="number" name="time" min="0" :value="time" @input="setTime" @keyup.enter="toggleEditTimer({id})"/>
        <small>ms</small>
      </div>
    </template>
    <template v-else>
      <div class="name">{{name}}</div>
      <div class="time">{{time || 0}}<small>ms</small></div>
    </template>
    <a href="#" class='action edit' :class="{'action-active': edit}" @click="toggleEditTimer({id})" v-show='edit || actionsVisible'>{{edit ? 'save' : 'edit'}}</a>
    <a href="#" class='action remove-timer' @click="removeTimer({id})" v-show='actionsVisible'>delete</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'timer',
  props: ['id', 'name', 'time', 'edit'],
  data: () => ({actionsVisible: true}),
  methods: {
    ...mapActions([ 'removeTimer', 'toggleEditTimer', 'disableEditTimer' ]),
    setName (e) {
      this.$store.dispatch('setTimerName', {
        id: this.id,
        name: e.target.value
      })
    },
    setTime (e) {
      this.$store.dispatch('setTimerTime', {
        id: this.id,
        time: e.target.value
      })
    },
    showActions () {
      this.actionsVisible = true
    },
    hideActions () {
      this.actionsVisible = false
      this.disableEditTimer({id: this.id})
    }
  }
}
</script>

<style lang="scss" scoped>

.timer {
  text-align: center;
  padding: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  background: #f6f6f6;
  height: 8rem;
  min-width: 11rem;
  outline: 0;
}

.action {
  display: inline-block;
  font-size: ms(1);
  text-decoration: none;
  margin: 1px;
  padding: 0 0.5em;

  outline: 0;

  &, &:visited {
    color: #999;
  }

  &:hover {
    background: white;
  }

  &.action-active {
    background: white;

    &:hover {
      background: #ddd;
    }
  }
}

.name {
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 900;
  clear: both;
  font-weight: bold;
  font-size: ms(1);
  min-height: ms(1);
}
.time {
  font-size: ms(3);
  .timer-edit & {
    font-size: ms(3);
  }
}

.id {
  font-weight: bold;
  color: #fff;
  float: left;
}

input {
  border: none;
  border-radius: 0;
  background: white;
  font-size: ms(1);
  text-align: center;
  padding: 0 0;

  &[name=name] {
    font-family: 'Alegreya Sans', sans-serif;
    font-weight: 900;
    width: 8em;
    font-size: ms(1);
  }
  &[name=time] {
    font-size: ms(3);
    width: 2em;
  }
}

</style>
