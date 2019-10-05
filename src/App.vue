<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-lg">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <b-navbar variant="faded" type="light" class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#"><del>Hate <img :src="require('./assets/user.png')" alt="" srcset=""></del>Speech</a>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #070707;
    font-family: 'Roboto', sans-serif;
    font-size: 2vw;
    font-weight: 700;
    &.router-link-exact-active {
      color: #42b983;
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
