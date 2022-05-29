<template>
  <header class="container-logo">
        <img src="../assets/logo-haut.png" width="200" height="200" alt="le logo de groupomania" title="logo groupomania" id="logo" />
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
    margin-top: 10px;
    margin-bottom: 0px;
    padding-top: 20px;
  }

  .container-logo{
      display: block;  
      flex-direction: row;
      text-align: center;        
  }

</style>