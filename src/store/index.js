import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timers: []
  },
  getters: {
    getTimerById (state) {
      return (id) => state.timers.find(timer => timer.id === id)
    }
  },
  actions: {
    addTimer ({commit}) {
      commit(types.ADD_TIMER)
    },
    removeTimer ({commit}, {id}) {
      commit(types.REMOVE_TIMER, {id})
    },
    setTimerName ({commit}, {id, name}) {
      commit(types.SET_TIMER_NAME, {id, name})
    },
    setTimerTime ({commit}, {id, time}) {
      commit(types.SET_TIMER_TIME, {id, time})
    },
    disableEditTimer ({commit, getters}, {id}) {
      commit(types.STOP_EDIT_TIMER, {id})
    },
    toggleEditTimer ({commit, getters}, {id}) {
      if (getters.getTimerById(id).edit) {
        commit(types.STOP_EDIT_TIMER, {id})
      } else {
        commit(types.EDIT_TIMER, {id})
      }
    }
  },
  mutations: {
    [types.ADD_TIMER] (state) {
      state.timers.push({
        id: +new Date(), // unix timestamp
        name: '',
        time: 0,
        edit: true
      })
    },
    [types.REMOVE_TIMER] (state, {id}) {
      state.timers = state.timers.filter(timer => timer.id !== id)
    },
    [types.EDIT_TIMER] (state, {id}) {
      const timer = state.timers.find(timer => timer.id === id)
      timer.edit = true
    },
    [types.STOP_EDIT_TIMER] (state, {id}) {
      const timer = state.timers.find(timer => timer.id === id)
      timer.edit = false
    },
    [types.SET_TIMER_NAME] (state, {id, name}) {
      const timer = state.timers.find(timer => timer.id === id)
      timer.name = name
    },
    [types.SET_TIMER_TIME] (state, {id, time}) {
      const timer = state.timers.find(timer => timer.id === id)
      timer.time = time
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
