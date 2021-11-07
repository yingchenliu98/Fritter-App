<template>
    <form class="update-form" @submit.prevent="updatePassword">
        <h3>Update Password</h3>
        <input 
          class="input-item"
          id="password" 
          name="password"
          placeholder='new password (at least 8 chars)'
          v-model="password" >

        <br>
       
        <span class='error-msg' v-if="error">{{ error }}</span>
        
        <br>
        <input class="update-btn" type="submit" value="Update Password">  
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'UpdatePasswordForm',
  data(){
      return{
        username:"",
        password:"",
        error: null,
        signedInUser: "",
        message: "",
      }
  },
  methods:{

    updatePassword() {
      axios
        .put("/api/users/session/update/password/edit", {
          password: this.password,
        })
        .then((response) => {
          
          eventBus.$emit("update-password-success", {
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