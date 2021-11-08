<template>
    <form class="signin-form" @submit.prevent="signIn">
        <h3>Sign In!</h3>
        <input 
          class="input-item"
          id="username" 
          name="username"
          placeholder='username (at least 6 chars)'
          v-model="username" >

        <input 
          class="input-item"
          id="password" 
          name="password"
          placeholder='passwords (at least 8 chars)'
          v-model="password" >

        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <input class="signin-btn" type="submit" value="Sign In">  
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'SignInForm',
  data(){
      return{
        username:"",
        password:"",
        error: null,
      }
  },
  methods:{
    signIn() {
      axios
        .post("/api/users/session/signin", {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          eventBus.$emit("login-success", response.data.username);
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

<style>
.signin-form{
  margin-top: 20vh;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-item {
  width: 50vw;
  border-radius: 50px;
  border: 1px solid #ccc;
  height: 50px;
  margin: 10px 0;
  padding-left: 30px;
  font-size: 1.5rem;
}
.signin-btn{
  border-radius: 50px;
  width: 50vw;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  background: -webkit-linear-gradient(120deg,#00E5FF, #1200FF);
  padding: 20px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.signin-btn:hover {
  filter: brightness(1.1);
  transition: All 0.2s ease-out;
}
</style>