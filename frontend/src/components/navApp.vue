<template>


 <nav class="navbar navbar-expand-md " style="background-color: #4E5166!important;">
    <!-- Container wrapper -->
    <div class= "container-fluid">   
      <!-- Collapsible wrapper -->
      <div class=" navbar-collapse" id="navbarSupportedContent">
       <!-- Navbar brand  : logo-->
        <div class="logo-container">
        <a class="navbar-brand mt-2 mt-lg-0" href="#">          
        <!--image pas defaut -->  
          <img
            src="../assets/logo-haut.png"
            height="115"
            alt="logo groupomania"
            loading="lazy"
          />
        </a>
        </div>
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
            Forum
            </router-link>
          </li>  

        <li class="nav-item navbar-nav me-auto mb-2 mb-lg-0">
          <router-link
          v-if ="isAdmin === true"  
          to='/listUsers'
          class="nav-link">
          Tous les utilisateurs
          </router-link>
        </li> 
    </ul>
      </nav>
                    
      <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
     
      <div class="d-flex align-items-center">        
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
              height="55"
              alt="Black and White Portrait of a Man"
              loading="lazy"           
              
            />
          </router-link>                    
        </div>

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
              height="50"
              alt="deconnexion"               
            />
            </router-link>          
          </div>                  
        </li>      
     
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
.dropdown{
  margin-left:10px;
}

  


.sidenav {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: -250px;
  background-color: #e8e8e8;
  padding-top: 60px;
  transition: left 0.5s ease;
}

.sidenav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

Sidenav menu links
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #111;
} 

@media (max-width: 768px) {    
.navbar-collapse{
  flex-basis:0%;
}
.logo-container{
  display:flex;
  flex-direction: column;
  align-items: center;

}
.navbar{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.align-items-center{
  margin:auto;
 
}
} 


</style>