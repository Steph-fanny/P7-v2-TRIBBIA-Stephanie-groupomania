<template>
  <section>
    <div class = container-post> 
      <div><navApp/></div>
      <div class="card gedf-card">
      </div>

      <listPost/>
  
  </div>  
  </section>
</template>


<script>
  import navApp from '@/components/navApp'
  import listPost from'@/components/listPost'


  export default {
    name: 'listPostPage',  

      components: {
        navApp, 
        listPost    
      }
  }    
    
</script>

<style lang = "css">


.bloclist {
  width: 70%;
  margin: auto;
  margin-top: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px; 
  padding: 25px;
}

.gedf-card  {
    margin:auto;   
    width: 50%;
    margin-top:50px;
    flex-direction: row;
    justify-content: center;
}
@media (min-width: 992px) {
            .gedf-main {
                padding-left: 2rem;
                padding-right: 2rem;
            }
            .gedf-card {
                margin-bottom: 2rem;
            }
        }

</style>