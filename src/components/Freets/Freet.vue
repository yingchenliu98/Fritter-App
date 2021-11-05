<template>
  <div class="freet">
      

    <h4>freet id: <span>{{ freet.id }}</span></h4>
    <h5>last edit: <br><span>{{ freet.timestamp }} </span></h5>
    <h5> Author: 
      <span>{{ freet.author }}
      <FollowButton 
      :freet = freet
      :userName = userName
      />
      </span>
    </h5>
    <p>{{ freet.content }}</p>
 
    <UpvoteButton
    :freet = freet
    :userName = userName
    />

    <RefreetButton
    :freet = freet
    :userName = userName
    />
    
    <div class="buttons">   
    <button  
      class="button" 
      v-show= "userName===freet.author"
      v-on:click="DeleteFreet">Delete
    </button>

    <button
      class="button" 
      v-show="!open && userName===freet.author"
      v-on:click="EditFreet"
      >Edit</button> 

    <button
      class="button" 
      v-show="open"
      v-on:click="SubmitEditedFreet"
      >Submit</button> 
  </div>
  <textarea 
    class="freet-container" 
    v-show="open"
    id="content"
    v-model="NewFreet.content"></textarea>
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

.buttons{
  display:flex; 
  justify-content:flex-end;
  
}

</style>
