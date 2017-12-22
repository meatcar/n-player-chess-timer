<template>
  <div class="nav">
    <router-link to="/">N Player Chess Timer</router-link>
  </div>
</template>

<script>
  export default{
    name: 'navigation'
  }
</script>

<style lang="scss" scoped>
.nav {
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 900;
  font-size: ms(3);

  a {
    text-decoration: none;

    &,
    &:visited {
      color: black;
    }
  }
}
</style>
