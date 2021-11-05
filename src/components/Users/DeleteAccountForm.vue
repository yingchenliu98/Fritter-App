<template>
    <div class="update-form">
        <h3>Delete Account</h3>
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <button class="update-btn" v-on:click="deleteAccount">Delete Account</button>  
    </div>
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
      }
  },
  created(){
    eventBus.$on("delete-account-success", () => {
        this.$cookie.set("fritter-auth", '');
        console.log("cookie!");
        this.$router.go();
    });
  },
  methods:{
    deleteAccount() {
      axios
        .delete("/api/users/delete", {
        })
        .then((response) => {
          eventBus.$emit("delete-account-success", {
            data: response.data,
            signedInUser: this.username
          });
          this.$router.push("/");
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