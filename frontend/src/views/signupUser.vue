<template>
 
 <div class ="container-signup">    
    <section class="vh-100 bg-image" style="background-color: #4E5166;">    
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 20px;">
            <div class="card-body blocsignup">
               <div><logoHome/></div> 
              <h2 class=" signup-subtitle text-uppercase text-center mb-5">Créer votre compte</h2>

              <form  id="form-signup">
                <div v-if="error" class="alert alert-danger" role="altert">
                  {{ error }}
                </div>
               
                <div class="form-outline mb-4">
                  <label class="form-label signup-title" for="firstName">Prénom</label>
                  <input v-model= "input.firstName"
                  type="text" 
                  id="firstName" name="firstName" class="form-control form-control-lg"
                  placeholder="Votre prénom" required/>                  
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label signup-title" for="lastName">Nom</label>
                  <input v-model= "input.lastName"
                  type="text" 
                  id="lastName" name="lastName" class="form-control form-control-lg"
                  placeholder="Votre nom" required/>                  
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label signup-title" for="email">Email</label>
                  <input v-model= "input.email"
                  type="email" 
                  id="email" name="email" class="form-control form-control-lg" 
                  placeholder="Votre adresse email valide" required
                />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label signup-title" for="password">Mot de passe</label>
                  <input v-model= "input.password"
                  type="password" id="password" name="password"
                  class=" password form-control form-control-lg" 
                  placeholder="Votre mot de passe*" required
                />
                  <p>*Minimum 5 caractéres dont 1 Majuscule, 1 minuscule, 2 chiffres</p>
                </div>                                    
                      
                <div class="d-flex justify-content-center">
                  <button 
                    @click.prevent ="dataSignup"
                    type="button" 
                    class="btnSignup btn btn-success btn-block btn-lg gradient-custom-4 ">
                    S'enregistrer
                  </button>
                </div>

                <p class="text-center text-muted mt-3 mb-0"> Vous avez déja un compte ? 
                <router-link to = "/login"
                class="signup-title"
                >Connectez vous !</router-link></p>                  

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
         
</div>     
                       
</template>


<script>
import logoHome from '@/components/logoHome.vue';

export default {
  name: "signupUser",  
  components: {
  logoHome 
  },

  data(){
      return{
        input:{
          firstName: "",
          lastName: "",
          email: "",
          password: "", 
          isAdmin:""     
        }, 
        error:"",            
      };     
    },


  methods:{
    dataSignup(){       

    let regEmailMatch = this.input.email.match(
        /^[a-zA-Z0-9.çæœ!#$%&’*+/=?^_`{|}~"(),:;<>[\]-]+@([a-zA-Z0-9-]+\.)+[\w-]{2,4}$/
      );
      if (regEmailMatch == null) {
        return alert ("Forme email incorrecte")
      }    
    let pass = this.input.password.match(
        "^(?=.{5,}$)(?=(?:.*?[A-Z]){1})(?=.*?[a-z])(?=(?:.*?[0-9]){2}).*$"
      );    
      if (pass == null) {
        return alert("Le mot de passe doit contenir 1 majuscule, minuscule, 2chiffres min caractère min: 6")
      }
  

      let inputDatas ={
        "firstName": this.input.firstName,
        "lastName" : this.input.lastName,
        "email": this.input.email,
        "password": this.input.password,
      }
      console.log(inputDatas)
      
      let urlSignup = "http://localhost:3000/api/user/signup"
      let option = {
        method : "POST",
        body :JSON.stringify(inputDatas),
        headers : {
          "content-type" : 'application/json',                  
                
        }
      }     
      console.log(option) 
      
      
      if (
        this.input.firstName !== "" || 
        this.input.lastName !== "" ||
        this.input.email !== "" || 
        this.input.password !== ""
        )   
         
        fetch(urlSignup, option)
          .then(res => res.json())
            .then((res) => {                 
              console.log(res)                  
              localStorage.setItem("userId", res.userId);                                     
              localStorage.setItem("token", res.token);
              console.log(localStorage)
              this.$router.push("/");
              alert(" Bienvenue sur Groupomania, connectez vous");                                                           
            })
            
          .catch(error => console.log(error)) 
    }                                                      
  }
}

  
</script>

<style>
.container-signup{
  width: 100%;
  height: 100%;
}

.signup-subtitle{
  color :#4E5166
}

.btn-block{
  background-color: #4E5166!important; 
}
.signup-title{
/* color: #FD2D01!important ; */
color: #E42701!important;
text-decoration: none !important;
font-weight: 600;
}

.btnSignup btn btn-success btn-block text-body{
  color: white !important;
  border-color:  #FFD7D7!important;
  
;
  }


</style>
