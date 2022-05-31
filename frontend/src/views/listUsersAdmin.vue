<template>
<div>
<div><navApp/></div>

<div class="container mt-3 mb-4">
<div class="col-lg-9 mt-4 mt-lg-0">
    <div class="row">
      <div class="col-md-12">
        <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
          <table class="table">
            <thead class ="thead-dark">
              <tr>               
                <th>Nom de l'utilisateur</th>                
                <th>Action</th>
              
              </tr>
            </thead>
            <tbody>
              <tr class="candidates-list"
               v-for="(user,index) in users.users"
                  v-bind:key="user.id"
              >
                <td class="title">
                  <!-- photo de profil-->
                  <div class="thumb">
                     <img
                      v-if="user.imageUrl == null"
                      src="../assets/photo-avatar-profil.png"
                      alt="photo de profil provisoire" id="avatar-profil"
                      class="img-fluid my-5"
                      style="width: 50px;"
                    /> 
                    
                    <img
                      v-else
                      :src="user.imageUrl"
                      alt="photo de profil " id="avatar-profil"
                      class="img-fluid my-5"
                      style="width: 50px;"
                    />    
                  </div>
                  <div 
                  class="candidate-list-details">         
                    <div class="candidate-list-info">
                      <div class="candidate-list-title">
                        <h5 class="mb-0 edit" @click="goUserProfil(user.id)">
                          {{index +1}} {{user.firstName }} {{ user.lastName}} 
                        </h5>
                      </div>
                      <div class="candidate-list-option">
                        <ul class="list-unstyled">
                          <li>{{user.email}}</li>                          
                        </ul>
                      </div>                   
                      
                    </div>
                  </div>
                 </td>

                   <td>
                  <ul class="list-unstyled mb-0 d-flex justify-content-end">
                    <button                       
                    class= "form-control btn btn-danger"
                    v-bind= "user"
                    @click="deleteUser(index)">
                    Supprimer le compte
                  </button> 
                    
                  </ul>
                </td>

             
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  </div>
</div>


</div>
</template>



<script>
import navApp from "@/components/navApp.vue";

export default {
  name: "listUsersAdmin",
  components: {
    navApp,   
  },

  data() {
    return {       
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),  
      users:[],   
      
    }
  },

 

async mounted() {
    this.userId = JSON.parse(localStorage.getItem("userId"));    
    console.log(localStorage);
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    


 const url = `http://localhost:3000/api/user/accounts`;
    console.log(this.users)
    const options = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
      };

      await fetch(url, options).then((res) => {
        res.json().then((data) => { 
          console.log(data)
          console.table(data)
          this.users = data      
                   
        })                 
      })               
  }, 

//  computed: {
//       comptage(){
//         return this.users.lenght
//       }      
//   },
 

     methods :{   
    // evolution pour admin affiche le profil de l'id)   
      //  goUserProfil(id){
      //    console.log(id)
      //    this.$router.push("/account/user")

      //  },
  
   deleteUser(index){         
     console.log(index)     

        let url = `http://localhost:3000/api/user/${this.users.users[index].id }` 
       
          let option = {
            method: "DELETE",
            headers: {
             'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
          };

        let confirmDeleteUser = confirm(
        " la suppresion du compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (confirmDeleteUser == true) { 
        return fetch(url, option)
        .then(function (res) {
        res.json()
        console.log(res.json)  
                               
            alert("Compte supprimé !");            
            localStorage.clear(); 
        })
                             
      } else
             alert("vous ne pouvez pas supprimer le compte") 
        //retour page accueil                  
          .catch(error => console.log(error))
      }   
    } 
  
  }

</script>

<style>
.edit{
  cursor : pointer;
}
.edit:hover{
 font-weight: bold;
}

body{
    background-color: #f8f9fa!important
}
.p-4 {
    padding: 1.5rem!important;
}
.mb-0, .my-0 {
    margin-bottom: 0!important;
}
.shadow-sm {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}    

/* user-dashboard-info-box */
.user-dashboard-info-box .candidates-list .thumb {
    margin-right: 20px;
}
.user-dashboard-info-box .candidates-list .thumb img {
    width: 80px;
    height: 80px;
    -o-object-fit: cover;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
}

.user-dashboard-info-box .title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding:0px;
}


.user-dashboard-info-box td li {
    margin: 0 4px;
}

.user-dashboard-info-box .table thead th {
    border-bottom: none;
}

.table.manage-candidates-top th {
    border: 0;
}

.user-dashboard-info-box .candidate-list-favourite-time .candidate-list-favourite {
    margin-bottom: 10px;
}

.table.manage-candidates-top {
    min-width: 650px;
}

.user-dashboard-info-box .candidate-list-details ul {
    color: #969696;
}

/* Candidate List */
.candidate-list {
    background: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox; 
    display: flex;
    border-bottom: 1px solid #eeeeee;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
.candidate-list:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    position: relative;
    z-index: 99;
}
.candidate-list:hover a.candidate-list-favourite {
    color:  #FD2D01;
    -webkit-box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
    box-shadow: -1px 4px 10px 1px rgba(24, 111, 201, 0.1);
}

.candidate-list .candidate-list-image {
    margin-right: 25px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 80px;
    flex: 0 0 80px;
    border: none;
}
.candidate-list .candidate-list-image img {
    width: 80px;
    height: 80px;
    -o-object-fit: cover;
    object-fit: cover;
}

.candidate-list-title {
    margin-bottom: 5px;
}

.candidate-list-details ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 0px;
} 
.candidate-list-details ul li {
    margin: 5px 10px 5px 0px;
    font-size: 13px;
} 

/* .candidate-list .candidate-list-favourite-time {
    margin-left: auto;
    text-align: center;
    font-size: 13px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 90px;
    flex: 0 0 90px;
}
.candidate-list .candidate-list-favourite-time span {
    display: block;
    margin: 0 auto;
} */
/* .candidate-list .candidate-list-favourite-time .candidate-list-favourite {
    display: inline-block;
    position: relative;
    height: 20px;
    width: 40px;
    line-height: 40px;
    border: 1px solid #eeeeee;
    border-radius: 100%;
    text-align: center;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    margin-bottom: 20px;
    font-size: 16px;
    color: #646f79;
} */
.candidate-list .candidate-list-favourite-time .candidate-list-favourite:hover {
    background: #ffffff;
    color: #FD2D01
;
}

.candidate-banner .candidate-list:hover {
    position: inherit;
    -webkit-box-shadow: inherit;
    box-shadow: inherit;
    z-index: inherit;
}

.bg-white {
    background-color: #ffffff !important;
}
.p-4 {
    padding: 1.5rem!important;
}
.mb-0, .my-0 {
    margin-bottom: 0!important;
}
.shadow-sm {
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
}

.user-dashboard-info-box .candidates-list .thumb {
    margin-right: 20px;
}


@media (max-width: 768px) {
    .my-5 {
      margin:0px;
    }
    .btn-danger {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 3px;
      margin-left:0px;
      max-width: 100%;     
      padding:4px;
      font-size:11px;
    }
    .img-fluid{
      width: 30px!important
    }
  .mb-0{
    font-size:14px;
  }
}





</style>