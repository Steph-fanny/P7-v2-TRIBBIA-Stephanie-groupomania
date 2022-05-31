<template>
  <header class="container-logo">
        <img src="../assets/logo-haut.png" width="180" height="180" alt="le logo de groupomania" title="logo groupomania" id="logo" />
  </header>
</template>


<script>
  export default {
    name: 'logoHome',
    }
</script>

<style>
  header{
    display: flex;  
    align-items: center;
    height: 8 rem;
    margin-top: 5px;
    margin-bottom: 0px;
    padding-top: 5px;
  }

  .container-logo{
      display: block;  
      flex-direction: row;
      text-align: center;        
  }

</style>