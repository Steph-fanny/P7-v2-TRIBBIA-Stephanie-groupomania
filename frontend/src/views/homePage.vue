<template>
 
  <div class="container" id="content">
    <div> <logoHome/></div>    
      <h1 class="homeTittle">Bienvenue dans le reseau social Groupomania</h1>
    <div class = "link">
      <router-link to="/signup" class="home-pagelink">S'inscrire</router-link> |
      <router-link to="/login" class="home-pagelink" >Se connecter</router-link>  
    </div>
  </div>
</template>

<script>
  import logoHome from '@/components/logoHome.vue'
  export default {
    name: 'homePage',  
    components: {
    logoHome 
    }
  }
</script>

<style>
  .link {
    font-weight: bold;
    text-align: center;
    color: #FD2D01;
    font-size: 35px;  
    text-align: center;
    margin-top: 100px;
  }
  .home-pagelink{
    color: #FD2D01!important;
    font-weight: 800;
    font-size:22px;
  }

.homeTittle{
   text-align: center;
   font-size : 45px;
   color : #4E5166;
   margin-top : 35px;
}

</style>
