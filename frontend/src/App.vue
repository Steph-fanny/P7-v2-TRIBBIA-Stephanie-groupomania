<template>
    
<!--afficher le composant defini dans le router en fonction de l'url --> 
<router-view/>   
  
</template>

<script>
export default{
  name: 'App',
}
</script>

<style>
#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;    
}
header{
  margin:0;
  padding:0;
}

</style>
