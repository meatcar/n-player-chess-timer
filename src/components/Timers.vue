<template>
  <div class="timers">
    <Timer v-for="timer in timers" :key="timer.id" v-bind="timer"></Timer>
    <a href="#" class="timer add-timer" @click="addTimer">+</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Timer from '@/components/Timer'
export default {
  name: 'timers',
  computed: {
    ...mapState([ 'timers' ])
  },
  methods: {
    ...mapActions([ 'addTimer' ])
  },
  components: {Timer}
}
</script>

<style lang="scss" scoped>
.timers {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.add-timer {
  background: none;
  padding: inherit 1rem;
  font-size: ms(5);
  text-decoration: none;
  display: inline-block;
  &, &:visited {
    color: black
  }

  &:hover {
    color: #666;
  }
  &:hover, &:focus, &:active {
    outline: 0;
  }
}
</style>


