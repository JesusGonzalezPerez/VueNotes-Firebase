<template>
  <div id="app">
    <Header/>
    
    <Tablero/>
  </div>
</template>

<script>


import Header from './components/Header/Header'
import Tablero from './components/Tablero/Tablero'

export default {
  name: "App",
  components:{
    Header,
    Tablero
  },
  data() {
    return {
     
    };
  },
  created() {
  },
  mounted :function(){
     

  },

};
</script>

<style>
#app{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 1rem;
    background-color: black;
    text-align: center;
}
</style>
