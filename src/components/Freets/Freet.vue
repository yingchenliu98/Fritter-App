<template>
  <div class="freet">
      <button  
        class="delete-button" 
        v-show= "userName===freet.author"
        v-on:click="DeleteFreet"><i class="fa fa-trash"></i>
      </button>
       <button
        class="edit-button" 
        v-show="!open && userName===freet.author"
        v-on:click="EditFreet"
        ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
    

    <h5><p>Freet id: <span>{{ freet.id }}</span></p>
    <p>last edit: {{ freet.timestamp }}</p></h5>
    <div class="author" display:inline > Author: 
     {{ freet.author }} 
     <FollowButton 
      :freet = freet
      :userName = userName
      />
    </div>
    <p v-show="!open">{{ freet.content }} </p>
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
    
      <div class= "button" display:flex align:left>
        <UpvoteButton
        :freet = freet
        :userName = userName
        />
      </div>
      <div class= "refreet-button" >
        <RefreetButton
        :freet = freet
        :userName = userName
        />
      </div>
 

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
        }
    }

  },

  methods:{

    DeleteFreet(){
      axios.delete("/api/freets/delete/" + this.freet.id)
       .then((response) => {
            eventBus.$emit("delete-freet-success",{
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
    EditFreet(){
      this.open = true;
      this.buttonValue= 'Submit';
    },
    SubmitEditedFreet(){
      axios.put("/api/freets/edit/" + this.freet.id, this.NewFreet)
        .then((response) => {
            eventBus.$emit("edit-freet-success",{
              data: response.data,
            });
            window.location.reload();
          })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            alert(error.response.data.error)
          }
        })
      
    }
}
}
</script>


<style scoped>
.freet {
  padding: 10px;
  width: 250px ;
  margin: 15px;
  margin-bottom: 18px;
  border: 3px solid #ddd;
  background-color: rgba(255, 255, 255, 0.432)
  }
.freet > p{  
  overflow-wrap: break-word;
}
.freet > h5 > span {
  font-weight: 100;
  display: flex;
  
}
.freet > h4 > span {
  font-weight: 100;
}

.freet-container {
  width: 100%;
  height: 100px;
}

.author{
  display:flex; 
  text-align: center;
  
}

.delete-button{
  float: right;
}
.edit-button{
  float: right;
}

</style>
