<template>
  <div class="refreet">
    <button  
      class="delete-button" 
      v-show="userName===refreet.refreeter && !upvoted"
      v-on:click="DeleteRefreet()"><i class="fa fa-trash"></i>
    </button>
    <h5> <span>@{{ refreet.id }} {{ refreet.timestamp.slice(0,10) }} </span></h5>
    <h4> {{ refreet.refreeter }}:<span> {{refreet.comments}}</span></h4> 
    <div class="original-freet" v-if='!error'>
    <p>@{{ originalFreet.id }} {{ originalFreet.timestamp.slice(0,10)}}</p>
    <span>{{ originalFreet.author }}</span>: {{originalFreet.content }}</div>
    
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

export default {
  name: "Refreet",

  props: {
    refreet: {
      type: Object,
      required: true,
    },
    upvoted: {
      type: Object,
      required: false,
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
    this.GetFreet() 
    eventBus.$on([ "delete-freet-success",
                    "edit-freet-success","delete-refreet-success"], ()=>{
        this.GetFreet();
    });
  },

  methods:{
      GetFreet() {
      axios.get('api/freets/'+this.refreet.freetId)
        .then((response) => {
            eventBus.$emit("get-freet-success",{
            data: response.data,
            });
            if(response.data){
                this.originalFreet = response.data;
            }

        })
        .catch((error) => {
            if (error.response && error.response.status != 200){
                this.error=true;
                this.originalFreet = error.response.data.error
            }
          })
  },

      DeleteRefreet(){
      axios.delete("/api/refreets/delete/" + this.refreet.id)
       .then((response) => {
            eventBus.$emit("delete-refreet-success",{
              data: response.data,
            });
         
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
  width: calc(100% - 60px);
  margin: 15px;
  margin-bottom: 18px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.refreet > p{  
  overflow-wrap: break-word;
}
.refreet > h4  {
  font-size:11.0pt;
}
.refreet > h4 > span {
  font-weight: 100;
}
.refreet > h5 > span {
  font-weight: 100;
  display: flex;
  font-size:10.0pt;
  color: #104763;
}
.original-freet {
  overflow-wrap: break-word; 
  padding: 10px;
  width: 250px auto ;
  margin: 15px;
  margin-bottom: 18px;
  border: 3px solid #ddd;
  background-color: rgba(212, 233, 245, 0.432);
  font-size:11.0pt;
  
}
.original-freet >span {
  font-weight:bold;
  font-size:11.0pt; 
}
.original-freet >p {
  font-weight: 100;
  display: flex;
  font-size:10.0pt;
  color: #104763;
}



.buttons{
  display:flex; 
  justify-content:flex-end;
  
}
.delete-button{
  float: right;
}
</style>
