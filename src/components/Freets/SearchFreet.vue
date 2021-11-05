<template>
    <form class="search-freet-form" @submit.prevent="onSubmit">
      <h3>Search for a Freet</h3>
      <input 
        class="search-container" 
        id="search" 
        placeholder='search for a freet by author....'
        v-model="searchContent">
      <input class="button" type="submit" value="Search">  
        
      <div><span class='error-msg' v-if="error">{{ error }}</span>
      <Freet 
        v-else-if="numResults!=0"
        v-for="freet in results"
        :key="freet.id"
        :freet="freet"
        />
      <span class='error-msg' v-else>This user has no freets posted yet.</span></div>
    </form>
  


</template>

<script>
import axios from 'axios'
import Freet from '@/components/Freets/Freet.vue'
import { eventBus } from '../../main'
export default ({
    name: 'SearchFreet',
    components: { Freet },
    data(){
        return{
            searchContent: '',
            results: null,
            error: null,
            numResults: null
        }
    },
    methods:{
        onSubmit(){
          this.error=null,
          axios.get("/api/freets/show/" + this.searchContent)
            .then((response) => {
              if(response.status === 200){
                eventBus.$emit("search-freet-success",{
                    data: response.data,
                });
                this.results = response.data;
                
              }
            })
              .catch((error) => {
                if (error.response && error.response.status != 200){
                  this.error = error.response.data.error
                }
              }).then(() => {
                this.searchContent='';
                this.numResults = this.results.length;
                })
          
        },
    
  
  
    }
})
</script>
<style scoped>
.search-freet-form{
  height: 280px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  margin: 40px ;
  background-color: #3CA3D8;
  
}
.search-container {
  display: flex;
  padding: 10px;
  border: 3px solid #ddd;
  background-color: white;

}
.search-freet-form .button {
  display: block;
  margin: 30px auto
}
.error-msg {
  margin-left:40px;
  color: rgb(0, 0, 0);
}


</style>