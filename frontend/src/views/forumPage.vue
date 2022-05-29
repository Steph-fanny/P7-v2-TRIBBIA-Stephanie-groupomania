<template>

<div class = container-post>
  <div><navApp/></div>
  <div><addPost/></div>
  <!-- <div><addPost2/></div> -->
  
   
     
  
    

</div>  



</template>


<script>
import navApp from '@/components/navApp'
import addPost from '@/components/addPost'
// import addPost2 from '@/components/addPost2'
// import addComment from '@/components/addComment'




export default {
name: 'forumPage',  

components: {
    navApp,
    addPost,
    // addPost2,
    // addComment,
   
},
  }


</script>

<style>

</style>