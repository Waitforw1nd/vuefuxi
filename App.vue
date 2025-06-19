<template>
  <!-- <MyElementPlus></MyElementPlus> -->
  <!-- <HomeView></HomeView> -->
  <router-view></router-view>
</template>

<script>
//import MyElementPlus from './components/MyElementPlus'
//import HomeView from './components/HomeView'

export default {
  name: 'App',
  
  components: {
    // MyElementPlus,
    //HomeView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100vh;
}
</style>
