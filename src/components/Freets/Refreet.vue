<template>
  <div class="refreet">
    <button  
      class="delete-button" 
      v-show= "userName===refreet.refreeter"
      v-on:click="DeleteRefreet()"><i class="fa fa-trash"></i>
    </button>
    <h4>refreet id: <span>{{ refreet.id }}</span></h4>
    <h5>time <br><span>{{ refreet.timestamp }} </span></h5>
    {{ refreet.refreeter }}: {{refreet.comments}}
    <div class="original-freet" v-if='!error'>
    {{ originalFreet.author }}: {{originalFreet.content }}</div>
    <section class="original-freet" v-else>{{ originalFreet }}</section>
    <p><UpvoteButton :freet = refreet :userName = userName /> </p>  

    <div class="buttons">   
   

    </div>
</div>
</template>

<script>
import { eventBus } from "../../main";
import axios from 'axios';
import UpvoteButton from "@/components/Freets/UpvoteButton.vue";
// import FollowButton from "@/components/Users/FollowButton.vue";
export default {
  name: "Refreet",

  props: {
    refreet: {
      type: Object,
      required: true,
    },
  },
  components:{
    UpvoteButton, 
  },
    data() {
        return{
        userName: this.$cookie.get('fritter-auth'),
        originalFreet: '',
        error: false,
        }


  },
    created() {
      axios.get('api/freets/'+this.refreet.freetId)
        .then((response) => {
            eventBus.$emit("get-freet-success",{
            data: response.data,
            });
            if(response.data){
                this.originalFreet = response.data;
            }
            
            //console.log(this.originalFreet)
        })
        .catch((error) => {
            if (error.response && error.response.status != 200){
                this.error=true;
                this.originalFreet = error.response.data.error
            }
          })
  },


  methods:{
      DeleteRefreet(){
      axios.delete("/api/refreets/delete/" + this.refreet.id)
       .then((response) => {
            eventBus.$emit("delete-freet-success",{
              data: response.data,
            });
            window.location.reload();
          })
       .catch((error) => {
           console.log(this.refreet)
            if (error.response && error.response.status != 200){
              alert(error.response.data.error)
            }
          })
    
    },
  
    }

}
</script>



<style scoped>
.refreet {
  padding: 10px;
  width: 250px ;
  margin: 15px;
  margin-bottom: 18px;
  border: 3px solid #ddd;
  background-color: rgba(255, 255, 255, 0.432)
  }
.refreet > p{  
  overflow-wrap: break-word;
}
.refreet > h5 > span {
  font-weight: 100;
  display:flex;
  
}
.refreet > h4 > span {
  font-weight: 100;
}

.original-freet {
  overflow-wrap: break-word; 
  padding: 10px;
  width: 250px auto ;
  margin: 15px;
 
  margin-bottom: 18px;
  border: 3px solid #ddd;
  background-color: rgba(75, 129, 158, 0.432)
  
}

.buttons{
  display:flex; 
  justify-content:flex-end;
  
}
.delete-button{
  float: right;
}
</style>
