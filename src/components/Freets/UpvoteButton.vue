<template>
    <div class="upvote">
    <button  
      class="button" 
      @mouseover="showUpvoters=true"
      @mouseleave="showUpvoters=false"
      v-on:click.prevent="upvoted ? UnUpvoteFreet() : UpvoteFreet()" 
      ><i class="fa fa-heart red-color " ></i> {{upVoteButton.text}} {{ freet.numUpvotes }}
    </button>
    <div v-show="showUpvoters">
      <span> {{ freet.upvoters.join(', ')}}</span>
    </div>
    </div>

</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import axios from 'axios';
import { eventBus } from "../../main";
export default {
    name:"UpvoteButton",
    props:{
       freet:{
           type: Object,
           required: true
       },
       userName:{
           type: String,
           required: true
       }
   },
    data() {
       return{
            upVoteButton:{
                text: 'Upvote'
            },
            showUpvoters: false,
            upvoted: false,
     
       }
   },
    created() {
        if(this.freet.upvoters.includes(this.userName)){
            this.upvoted=true;
        }else{
         this.upvoted=false;
        }
        this.upVoteButton.text = this.upvoted ? 'Unupvote' : 'Upvote';

  },
    methods:{
    UpvoteFreet(){
        axios.post("/api/freets/upvote/" + this.freet.id)
            .then((response) => {
            eventBus.$emit("upvote-freet-success",{
                data: response.data,
            }); 
            window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })
        },
    UnUpvoteFreet(){
        axios.put("/api/freets/unupvote/" + this.freet.id)
            .then((response) => {
            eventBus.$emit("unupvote-freet-success",{
                data: response.data,
            }); 
            window.location.reload();
            
            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })
        },
   }
}
</script>
<style scoped>
.buttons{
  display:flex; 
  justify-content:flex-end;
 
}
.red-color {
color:red;
}

</style>
