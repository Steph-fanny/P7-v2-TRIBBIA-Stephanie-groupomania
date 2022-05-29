<!-- bouton voir pour ajouter un commentaire  
            <button class="btn btn-danger" 
              @click="showCreateComment = !showCreateComment ">
              Commenter
            </button> --> 


<!--affichage composant ecrire un commentaire
            <div
            v-if="showCreateComment" >-->
              <addComment/>
              <!--</div>-->


<button class="btn btn-danger" 
              @click="showComments= !showComments">
              Voir les Commentaires
</button>  


 <div v-if="comments == null">        
        <p> Aucun commentaire pour le moment!</p>
        </div> 


<div v-if="showComments">
          <div v-if="comments">                       
              class="card-comment"            
              v-for="comment in comments"             
              v-bind:key="comment.id"          
            >












<template>

  <div class="container-fluid gedf-wrapper">
 
    <!-- On récupére les posts : boucle avec vfor -->
    <!-- tableau de post-->
    <div class="bloclist"
      v-bind:key="post.id"
      v-for="post in posts.posts"       
    >
    <!-- {{ posts }} -->
      <div class="post-card">
        <div class="card gedf-card">
          <div class="card-header container-info"
          v-for="user in users.users.filter((user)=>{
              return user.id == post.userId})"
            v-bind:key="user.id">
           
            <!-- info d'entete-->
            <div class="mr-2">                          
              <img
                  v-if = "user.imageUrl == null"
                  src="../assets/photo-avatar-profil.png"
                  alt="photo de profil provisoire" id="avatar-profil"
                  class="rounded-circle"
                  style="width: 50px;"
              /> 
                    
              <img
                  v-else
                  :src="user.imageUrl"
                  alt="photo de profil " id="avatar-profil"
                   class="rounded-circle"
                  style="width: 50px;"
                />              
            </div>
            <div class="ml-2 info-post">
              <div class="h5 m-0"> 
                {{ user.firstName }} {{user.lastName }}
                </div>
              <div class="h5 m-0 h7 mb-2 time-post">
                {{ moment(post.createdAt).fromNow() }}<i class="fa fa-clock-o"></i>
              </div>
            </div>
          </div>

          <!--info du post-->
          <div class="card-body">
            <p v-if ="post.content!== 'null'" class="card-text">{{ post.content }}</p>

            <div             
            v-if = "post.imageUrl">
              <img class=" imagePost" 
              v-bind:src="post.imageUrl" alt="image du post" 
              />
            </div>    
          <!-- bouton effacer si l'utilisateur a écrit le post-->       
            <div class ="btn-deletePost">
                      
              <button 
              v-if="post.userId == user.id" 
              type="button"
              class="btn btn-danger"
              title="supprimer"
              aria-label="bouton supprimer"
              @click="deletePost(post.id)"
              >
              supprimer le post
              </button>
           
              <button class="btn btn-danger" 
                @click="showComments = !showComments">
                Voir les Commentaires
              </button>
            
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
   
         
<!--**********************************commentaire **************-->
    <!-- affichage des commentaires   
        <div  
            
              class="card-comment"            
              v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
              })"  
              v-bind:key="comment.id"         
            >
                                               
  
            <div 
            class="comment-info"             
            v-for="user in users.users.filter((user)=>{
            return user.id == post.userId})"
            v-bind:key="user.id">

              <span class="comment-avatar float-left">
                <img
                  v-if = "user.imageUrl == null"
                  src="../assets/photo-avatar-profil.png"
                  alt="photo de profil provisoire" id="avatar-profil"
                  class="rounded-circle"
                  style="width: 50px;"
                  /> 
                    
                  <img  
                  v-else            
                  :src="user.imageUrl"
                  alt="photo de profil " id="avatar-profil"
                   class="rounded-circle"
                  style="width: 50px;"
                  /> 
              </span>

                <div class="card-author">                
                  {{ user.firstName }} {{user.lastName }}
                </div>
            </div>     
  
          <div class="card-body">
            <p v-if ="comment.content!== 'null'" class="card-text">{{ comment.content }}</p>
           
            <div class ="btn-deleteComment">                      
              <button 
              v-if="comment.userId == user.id" 
              type="button"
              class="btn btn-danger"
              title="supprimer"
              aria-label="bouton supprimer"
              @click="deleteComment(comment.id)"
              >
              supprimer le commentaire
              </button>   
            </div>  
          </div>  
        </div>    -->                
        


  <addComment/> 












          
 
</template>
   
<script>
// import { mapState } from "vuex";
let moment = require("moment");
moment.locale("fr"); 
import addComment from'@/components/addComment'

export default {
  name: "listPost",
  components : {
    addComment
     
  },

  data() {
    return {        
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),  
      users:[],
      user: {
        id: localStorage.getItem("userId"),
        userId: "",    
        firstName: " ",
        lastName: "",      
        imageUrl: "",         
        isAdmin: "",
      },
      post: [],
      posts: [],
      moment: moment,
      date:"",
    };
  },

  // computed:{
    

  // // //   ...mapState(["user"])
  // },

  async created (){   

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
    
  async mounted() {
    // appel à l'api pour affichage 
    this.userId = JSON.parse(localStorage.getItem("userId"));    
    console.log(localStorage);

    
    let url = "http://localhost:3000/api/post";
    let options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    this.posts = await fetch(url, options).then((res) => {
      // traduction en json)
        res.json()      
      .then((data) => {
        console.log(data);        
        this.posts = data;
        console.log(this.posts)
        const currentPosts = this.posts.posts.reverse().slice;
       console.log(currentPosts)
      })
       
    });
  },


//commentaire//
// async mounted() {
//     // appel à l'api pour affichage 
//     this.userId = JSON.parse(localStorage.getItem("userId"));    
//     console.log(localStorage);

//     // console.log("test");
//     let url = "http://localhost:3000/api/comment";
//     let options = {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     };
//     this.comments = await fetch(url, options).then((res) => {
//       // traduction en json)
//         res.json()      
//       .then((data) => {
//         console.log(data);        
//         this.comments = data;
//         console.log(this.comments)
//         const currentPosts = this.comments.comments.reverse().slice;
//        console.log(currentPosts)
//       })
       
//     });
  
 







  methods: {
    async getPosts()  {
      console.log("test");
      let url = "http://localhost:3000/api/post";
      let options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      return await fetch(url, options).then(function (res) {
        res.json()
         .then(function (data) {
         this.posts = data;
        console.log(this.posts);
        return data;
          
        });
      })
    },

  // Permet d'afficher la date de publication au bon format
    // dateFormat(date){
    //   if (date) {
    //     return moment(String(date)).format('DD/MM/YYYY')
    //   }
    // },

// async getComments()  {
//       console.log("test");
//       let url = "http://localhost:3000/api/comment";
//       let options = {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       };
//       return await fetch(url, options).then(function (res) {
//         res.json()
//          .then(function (data) {
//          this.comments = data;
//         console.log(this.comments);
//         return data;
          
//         });
//       })
//     },

    //supprimer le message//
    deletePost(postid) {
      let url = `http://localhost:3000/api/post/${postid}`;
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(url, options)
        .then(function (res) {
          console.log(res);
          alert("Suppression du message confirmé ! ");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },

    //supprimer le commentaire//
    // deleteComment(commentid) {
    //   let url = `http://localhost:3000/api/comment/${commentid}`;
    //   let options = {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   };
    //   fetch(url, options)
    //     .then(function (res) {
    //       console.log(res);
    //       alert("Suppression du commentaire confirmé ! ");
    //       window.location.reload();
    //     })
    //     .catch((error) => console.log(error));
    // },




  },
};
</script>





  