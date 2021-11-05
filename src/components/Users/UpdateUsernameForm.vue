<template>
    <form class="update-form" @submit.prevent="updateUsername">
        <h3>Update Username</h3>
        <input 
          class="input-item"
          id="username" 
          name="username"
          placeholder='new username (at least 6 chars)'
          v-model="username" >

        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <input class="update-btn" type="submit" value="Update Username">  
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'UpdateUsernameForm',
  data(){
      return{
        username:"",
        error: null,
        signedInUser: "",
      }
  },
  methods:{
    updateUsername() {
      axios
        .put("/api/users/session/update/username/edit", {
          username: this.username,
        })
        .then((response) => {
          eventBus.$emit("update-username-success", {
            data: response.data,
            signedInUser: this.username
          });
          alert(response.data.message);
          eventBus.$emit("signout-success", true);
        })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error;
          }
        })
    }
    }
})
</script>
<style>
.update-form {
  width: 30vw;
  padding-left: 20px;
  border-left: 1px black solid;
}
.update-form > h3 {
  color: #3CA3D8;
}
.update-btn {
  border-radius: 5px;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  background-color: #3CA3D8;
  padding: 20px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
.update-btn:hover {
  filter: brightness(1.1);
  transition: All 0.2s ease-out;
}
</style>