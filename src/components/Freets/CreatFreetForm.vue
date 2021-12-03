<template>
    <form class="create-freet-form" @submit.prevent="createFreet">
        <h3 class="title">Create a Freet</h3>
        <input
          type="text" 
          class="freet-container" 
          id="content" 
          placeholder='create a freet....'
          v-model="NewFreet.content" >
        
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
  width: calc(100% - 120px);
  padding: 20px;
  margin: 40px ;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.title {
  background: -webkit-linear-gradient(120deg, #00E5FF, #1200FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.freet-container {
  display: flex;
  height: 100px;
  padding: 20px;
  border-radius: 10px;
  background-color: #E8F0FC;
  border: 0;
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

.button {
  font-weight: 600;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  background: -webkit-linear-gradient(120deg, #00E5FF, #1200FF);
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
</style>