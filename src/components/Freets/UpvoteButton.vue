<template>
    <div class="upvote">
    <button  
      class="freet-btn" 
      @mouseover="showUpvoters=true"
      @mouseleave="showUpvoters=false"
      v-on:click.prevent="upvoted ? UnUpvoteFreet() : UpvoteFreet()" 
      ><i class="fa fa-heart " ></i> {{upVoteButton.text}} {{ freet.numUpvotes }}
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
        this.UpdateStatus();
        // eventBus.$on(["upvote-freet-success", "unupvote-freet-success"],() =>{
        //        this.UpdateStatus();
        // })
      
       
  },
    methods:{
        //some problem with this
    UpdateStatus(){
        if(this.freet.upvoters.includes(this.userName)){
            this.upvoted=true;
        }else{
         this.upvoted=false;
        }
        this.upVoteButton.text = this.upvoted ? 'Unupvote' : 'Upvote';
    },
    UpvoteFreet(){
        axios.post("/api/freets/upvote/" + this.freet.id)
            .then((response) => {
            eventBus.$emit("upvote-freet-success",{
                data: response.data,
            }); 
            window.location.reload()
            // this.UpdateStatus()
            // this.upvoted=true;
            // this.upVoteButton.text = this.upvoted ? 'Unupvote' : 'Upvote';
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
            // this.upvoted=false;
            // this.upVoteButton.text = this.upvoted ? 'Unupvote' : 'Upvote';

            // this.UpdateStatus()
            window.location.reload()
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

</style>
