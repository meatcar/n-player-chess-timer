<template>
  <div class="nav">
    <router-link class="brand" to="/">NPlayerChessTimer</router-link>
    <a class="alt" href="#">Start</a>
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
  padding: 0 2rem;
  padding-bottom: 1rem;

  .brand {
    letter-spacing: -2px;
  }
  a {
    text-decoration: none;
    margin-right: 2rem;

    &,
    &:visited {
      color: black;
    }

    &.alt {
      color: #66f;
    }
  }
}
</style>
