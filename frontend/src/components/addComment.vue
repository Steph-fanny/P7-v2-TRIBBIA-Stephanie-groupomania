<template>

    <div class="container mt-2">
        <div class="commentaire d-flex justify-content-center row">           
            <div class="bg-light p-2">
                <div class="d-flex flex-row align-items-end">   
                    <form 
                        id="formElem"
                        class="container text-center form-group"
                        @submit.prevent="addComment"
                        enctype="multipart/form-data"
                        method="post"
                        >

                        <div class= "form-group content-card">            
                        <label for="content"></label>
                            <textarea 
                                type="text" 
                                id="content" name="content" rows="1" cols="2"
                                class="form-control ml-1 shadow-none textarea"
                                placeholder="Ecrivez votre commentaire ici" 
                                required 
                                v-model="content"                                
                                >
                            </textarea>
                        </div>           
                        <div class="mt-1 text-right" >
                           
                            <!--bouton envoyer un commentaire--> 
                                <button                                    
                                    type="submit"
                                    title="commentaire"
                                    id="btn-post"
                                    class="send btn btn-primary btn-sm shadow-none " 
                                    aria-label="créer un commentaire"  
                                    ref="comment"  v-bind="$attrs"                    
                                    @click="createComment(comment.id)"                                                                                                           
                                    >Publier
                                </button>                                                                                          
                        </div> 
                    </form>                                         
                </div>
            </div> 
        </div>    
    </div>  
</template>
        

<script>
export default {
    name: "addComment",
    data() {
        return {   
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            postId: "",
            content: "",        
            comment: {},                                                           
        };
    },

    props : ['idPostParent'],

     mounted() {
            this.userId = parseInt(localStorage.getItem("userId"));
            console.log(this.userId)
           
     /// écrire un commentaire
    let url = "http://localhost:3000/api/comment/new"          
    let options = {
            method: "POST",                    
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };                   
               
        fetch(url, options)
        .then((res) => {
            res.json()
            .then(data =>{
                console.log(data)
                this.comment = data
                console.log(this.comment)
            })              
            .catch(error => console.log(error))
        })
    },


    methods: {
    /*** Créer un nouveau commetaire ***/
        async createComment(){     
            if(this.content ==="" ){
            return alert ("Veuillez inserer un commentaire ")
            }                                                 
                
                             
            let inputContent = {
                "content": this.content,                
                "userId" : localStorage.getItem("userId"),
                "postId" : this.idPostParent
            }        
            console.log(inputContent)
               
                    
       
            let url = "http://localhost:3000/api/comment/new"          
            let options = {
                method: "POST",
                body:JSON.stringify(inputContent),
                // body : formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }                    
               
       await fetch(url, options)
        .then((res) => {
            res.json()
            console.log(res)            
            if (res.ok){   
                this.content= "" // Retour à 0 des inputs //              
                alert(" Commentaire bien reçu");               
                                    
            }else{
                alert("vous ne pouvez pas publier ce message ")
            }
        })
         .then (window.location.reload())
        .catch(error => console.log(error)) 
        }             

    }                       
} 
                          
</script>

<style>
.commentaire{
width:100%;
display: block;
flex-direction: row;
text-align: right;
}

rounded-circle{
    margin-right: 10px;
}
.send{
     background-color: #0d0764 !important;
    color: white;    
    margin-right: 20px;
    
}

</style>