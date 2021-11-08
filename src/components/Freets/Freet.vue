<template>
  <div class="freet">
      <button  
        class="delete-button" 
        v-show="userName===freet.author && !search &&!upvoted"
        v-on:click="DeleteFreet"><i class="fa fa-trash"></i>
      </button>
       <button
        class="edit-button" 
        v-show="!open && userName===freet.author && !search &&!upvoted"
        v-on:click="EditFreet"
        ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
    

    <h5> <span>@{{ freet.id }} {{ freet.timestamp.slice(0,10) }}</span></h5>
 
    <div class="author" display:inline > 
      <span>Author: {{ freet.author }} </span>
     <FollowButton 
      :freet = freet
      :userName = userName
      />
    </div>
    <p v-show="!open" >{{ freet.content }} </p>
       <textarea 
        class="freet-container" 
        v-show="open"
        id="content"
        v-model="NewFreet.content">
      </textarea>
    <button
        class="edit-button" 
        v-show="open"
        v-on:click="SubmitEditedFreet"
        ><i class="fa fa-check" aria-hidden="true"></i>Submit</button> 
   
      <button  
      class="button" 
      v-show="open"
      v-on:click="open=false" 
      > <i class="fa fa-close"></i> Cancel
      </button>
      
    
      <div v-show="!search">
        <UpvoteButton
          :freet = freet
          :userName = userName
        />
        <RefreetButton
          :freet = freet
          :userName = userName
        />
      </div>
        <span v-if="error && open">{{ error }}</span>
    </div>
    
  


</template>

<script>
import { eventBus } from "../../main";
import axios from 'axios';
import UpvoteButton from "@/components/Freets/UpvoteButton.vue";
import FollowButton from "@/components/Users/FollowButton.vue";
import RefreetButton from "@/components/Freets/RefreetButton.vue";

export default {
  name: "Freet",
  props: {
    freet: {
      type: Object,
      required: true,
    },
    search: {
      type: Boolean,
      required: false,
    },
    upvoted: {
      type: Boolean,
      required: false,
    },
  },
  components:{
    FollowButton, UpvoteButton, RefreetButton, 
  },
  data() {
    return{
      userName: this.$cookie.get('fritter-auth'),
      open: false,
      NewFreet:{
        content: this.freet.content+ "",
        },
      error:null,
    }

  },

  methods:{
    
    DeleteFreet(){
      axios.delete("/api/freets/delete/" + this.freet.id)
       .then((response) => {
            eventBus.$emit("delete-freet-success",{
              data: response.data,
            });
          })
       .catch((error) => {
            if (error.response && error.response.status != 200){
              alert(error.response.data.error)
            }
          })
    
    },
    EditFreet(){
      this.open = true;
      this.error=null;
      this.buttonValue= 'Submit';
    },
    SubmitEditedFreet(){
      axios.put("/api/freets/edit/" + this.freet.id, this.NewFreet)
        .then((response) => {
            eventBus.$emit("edit-freet-success",{
              data: response.data,
            });
            this.open = false;
            
          })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error
          }
        })
      
    }
}
}
</script>


<style scoped>
.freet {
  padding: 10px;
  width: calc(100% - 60px);
  margin: 15px;
  margin-bottom: 18px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.freet > p{  
  overflow-wrap: break-word;
  font-size:11.0pt;
}
.freet > h5 > span {
  font-weight: 100;
  display: flex;
  font-size:10.0pt;
  color: #104763;
}

.freet-container {
  width: 100%;
  height: 100px;
}

.author{
  display:flex; 
  align-items: center;
  font-size:11.0pt;
  font-weight:bold;
}

.author > span {
  margin-right: 20px;
}

.delete-button{
  float: right;
}
.edit-button{
  float: right;
}


</style>
