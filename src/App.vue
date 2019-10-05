<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-lg">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <b-navbar variant="faded" type="light" class="mx-auto order-0">
        <a @click="$router.push('/')"  class="navbar-brand mx-auto"><del id="hate">Hate</del> <img :src="require('./assets/user.png')" alt="" srcset="">Speech</a>
      </b-navbar>

    </div>






    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
}
#nav {
  padding: 30px;
  a {
    color: #070707;
    font-family: 'Raleway', sans-serif;
    font-size: 2vw;

    &.router-link-exact-active {
      color: #42b983;
    }

    #hate {
      font-family: 'Maven Pro', sans-serif;
      font-weight: 900;
      letter-spacing: 0.1em;
      font-size: 2.3vw;
    }
  }
  align-items: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 8px 6px -6px #999;

}

img {
  height: 3vw;
}
</style>
