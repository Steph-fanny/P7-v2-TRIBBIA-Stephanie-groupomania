<template>
<div class="card">     
    <div class="card gedf-card">       
        <div class="card-body" >
            <div class ="card-top">                                  
            </div>  
            <form 
                id="formElem"
                class="container text-center form-group"
                @submit.prevent="addPost"
                enctype="multipart/form-data"
                method="post"
                >

                <div class= "form-group content-card">            
                    <label for="content"></label>
                        <textarea type="text" 
                        id="content" name="content" rows="3" cols="15"
                        class="form-control" 
                        placeholder="Que voulez-vous partager aujourd'hui?" 
                        required 
                        v-model="content"></textarea>
                </div>           
                <div class="btn-toolbar justify-content-between align-items-center" >
                    <div class="btn-group  mx-auto">
                        <button 
                        type="submit"
                        id="btn-post"
                        class="btn btn-primary "                        
                       
                        >Publier</button>    
                   

                        <label for="file"
                            class="form-control-label upload-File" 
                            style="margin-top:50px">
                            Choisir une image
                        </label>                                                                                                
                        <input
                        type="file" 
                        class="btn btn-primary" 
                        id="file" name="file"
                        accept="file/*" ref="file" 
                        aria-describedby="image" 
                        @change="selectFile()"         
                        />                        
                                                                                                  
                    </div>     
                </div> 
            </form>                                           
        </div>
    </div>
</div> 

</template>

<script>

export default {
    name:'addPost',    
    data() {
        return {   
            token: localStorage.getItem("token"),                                             
            content:"" ,                         
            file:"",  
            userId: ""                   
        }
    },

    mounted() {
            this.userId = JSON.parse(localStorage.getItem("userId"));
            console.log(this.userId)
    },

    methods: {                    
        selectFile() {
            // ref à l'image dans l'input                      
            this.file = this.$refs.file.files[0];
            this.imageUrl = URL.createObjectURL(this.file);      
        },
            
      
        /*** Créer un nouveau post ***/
        async addPost() {     
            if(this.content ===""&& this.file ==="" ){
            return alert ("Veuillez inserer un fichier ou un texte")
        }                   
            // creation objet formData)       
            let formData = new FormData()
                formData.append("file", this.file);
                formData.append("content",this.content); 
                formData.append("userId", parseInt(localStorage.getItem("userId")));              
                              
            let url = "http://localhost:3000/api/post/new"
            let options = {
                method: "POST",              
                body: formData,         
                headers: {    
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),               
                }
            }
               
        await fetch(url, options)
        .then((res) => {
            res.json()
            console.log(res)  
            if (res.ok){
                this.content = {} // Retour à 0 des inputs //                    
                // this.$router.push("/listPostPage");
                alert(" Post bien reçu"); 
            }else{
                alert("vous ne pouvez pas publier ce message ")
            }
             this.$router.push("/listPostPage");
        })     
        .catch(error => console.log(error)) 
        }          
    }                       
} 

       

</script>

<style>

label:hover{
 color:#FD2D01 !important;
 font-size: large;
 font-weight:600
 
}

.publication-link{
    background-color: #4E5166 !important;

}
#image{
    display:none;
}
.content-card{
    margin-top:0px;
}
.gedf-card  {
    margin:auto;   
    width: 50%;
    margin-top:25px !important;
    flex-direction: row;
    justify-content: center;
}
.btn {
    background-color: #4E5166 !important;
    margin-right:5px; 
    margin-bottom: 0px;
}

 @media (min-width: 992px) {
            .gedf-main {
                padding-left: 4rem;
                padding-right: 4rem;
            }
            .gedf-card {
                margin-bottom: 2.77rem;
            }
        }

        /**Reset Bootstrap*/
        .dropdown-toggle::after {
            content: none;
            display: none;
        }

</style>