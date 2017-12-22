<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans:900|Fira+Sans:300');

html,
body {
  font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.45;
}

#app {
  color: #000;
  background-color: #fff;
  font-size: ms(0);
}

</style>
