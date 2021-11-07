<template>
    <form class="create-freet-form" @submit.prevent="createFreet">
        <h3>Create a Freet</h3>
        <textarea 
          class="freet-container" 
          id="content" 
          placeholder='create a freet....'
          v-model="NewFreet.content" >
        </textarea>
        
        <span class='error-msg' v-if="error">{{ error }}</span>
        <input class="button" type="submit" value="Post">  
        


    </form>
</template>

<script>
//import FreetServices from '@/services/FreetService.js'
import { eventBus } from "../../main";
import axios from "axios";
export default ({
  name: 'CreateFreetForm',
  data(){
      return{
        
        error: null,
        NewFreet:{
        content: "",
        }
      }
  },
  methods:{
      createFreet(){
        //this.error = null;
        axios.post("api/freets/create", this.NewFreet)
          .then((response) => {
            eventBus.$emit("create-freet-success",{
              data: response.data,
            });
          })
          .catch((error) => {
            if (error.response && error.response.status != 200){
              this.error = error.response.data.error
            }
        })
      this.content = null;
      
      }
    }
})
</script>
<style scoped>
.create-freet-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  margin: 40px ;
  background-color: #3CA3D8;
}
.freet-container {
  display: flex;
  height: 100px;
  padding: 20px;
  border: 3px solid #ddd;
  background-color: white;
 
}

.freet-container li {
  margin-bottom: 30px;
}

.create-freet-form .button {
  display: block;
  margin: 30px auto;
}
.error-msg {
  margin-left:40px;
  color: rgb(0, 0, 0);
}
</style>