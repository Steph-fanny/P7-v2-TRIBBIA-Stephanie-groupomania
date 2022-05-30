<template>
   
  <nav class="navbar navbar-expand-lg " style="background-color: #4E5166!important;">
    <!-- Container wrapper -->
    <div class= "container-fluid">   
      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <!-- Navbar brand -->
        <a class="navbar-brand mt-2 mt-lg-0" href="#">          
        <!--image pas defaut -->  
          <img
            src="../assets/icon-left-font.png"
            height="115"
            alt="logo groupomania"
            loading="lazy"
          />
        </a>

 <nav class="navbar navbar-expand-sm ">
         <!-- Links -->
         <ul class="navbar-nav">

        <!-- Left links -->      
          <li class="nav-item navbar-nav me-auto mb-2 mb-lg-0">
            <router-link
            to="/forum"
            class="nav-link">
            Créer un post
            </router-link>
          </li>  

        <li class="nav-item navbar-nav me-auto mb-2 mb-lg-0">
            <router-link
            to="/listPostPage"
            class="nav-link">
            Voir tous les posts
            </router-link>
          </li>  

        <li class="nav-item navbar-nav me-auto mb-2 mb-lg-0">
          <router-link
          v-if ="isAdmin === true"  
          to='/listUsers'
          class="nav-link">
          Voir tous les utilisateurs
          </router-link>
        </li> 
    </ul>
      </nav>
                    
      <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
      <div class="d-flex align-items-center">
          <li  @click="logout"  class= "dropdown-item ">            
           <!-- deconnexion -->
        <div class="dropdown">
          <router-link to= "/account/user" 
            class="d-flex align-items-center"         
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"            
          >
            <img
              src="../assets/kisspng-abmeldung-button-icon-shut-cliparts-5a89cae38f35c7.1285697615189798115866.png"
              height="45"
              alt="deconnexion"              
            
              
            />
          </router-link>
          
        </div>                            
                         

          </li>
              
        <!-- Avatar -->
        <div class="dropdown">
          <router-link to= "/account/user" 
            class="d-flex align-items-center"         
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"            
          >
            <img
              src="../assets/icon-profil.png"
              class="rounded-circle"
              height="85"
              alt="Black and White Portrait of a Man"
              loading="lazy"
             
              
            />
          </router-link>
                    
        </div>
      </div>
      
    </div>
  </nav>
</template>

<script>

export default {
  name: "navApp",

  data() {
    return { 
      isAdmin:"",
    } 
  },

 async mounted() {    
    this.userId = JSON.parse(localStorage.getItem("userId"));    
    console.log(localStorage);
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
 },


  methods : {   
    
  logout() {
        localStorage.clear();
        this.$router.push("/");
    },
  }
};

</script>

<style>

.nav-link {
    color :white !important;
}
.dropdown-item{
  color: white !important;
}

</style>