<template>
    <form class="signup-form" @submit.prevent="signUp">
        <h3>Create an account!</h3>
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
        <span>Username and Passwords can be changed later.</span>
        <br>
        <span class='error-msg' v-if="error">{{ error }}</span>
        <br>
        <input class="signup-btn" type="submit" value="Sign Up">  
    </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'SignUpForm',
  data(){
      return{
        username:"",
        password:"",
        error: null
      }
  },
  methods:{
    signUp() {
      axios
        .post("/api/users/", {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          eventBus.$emit("signup-success", {
            data: response.data,
          });
          this.$router.push("/signin");
        })
        .catch((error) => {
          if (error.response && error.response.status != 200){
            this.error = error.response.data.error;
          }
        })
    }
      // onSubmit(){
      //   this.error = null;
      //   UserService.SignIn()
      //     .catch((error) => {
      //       if (error.response && error.response.status != 200){
      //         this.error = error.response.data.error
      //       }
      //   })
      // }
    }
})
</script>
<style>
.signup-form{
  margin-top: 20vh;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-btn{
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
.signup-btn:hover {
  filter: brightness(1.1);
  transition: All 0.2s ease-out;
}
</style>