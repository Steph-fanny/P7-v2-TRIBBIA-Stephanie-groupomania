<template>

<div class = container-post>
  <div><navApp/></div>
  <div><addPost/></div>  
</div>  

</template>


<script>
import navApp from '@/components/navApp'
import addPost from '@/components/addPost'

export default {
  name: 'forumPage',  

  components: {
      navApp,
      addPost,   
  },
}

</script>

<style>
</style>