<template>
    <div>
        <Navbar />
        <div class="body-container">
            <SignInForm />
            <div v-if="isSignedIn">
                <p>Signed In!</p> 
            </div>
            <div v-else class="create-account">
                <router-link to="/signup">Create A New Account</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import SignInForm from '@/components/Users/SignInForm.vue';
import { eventBus } from "../main";

export default {
  name: 'Signin',
  data() {
      return {
          isSignedIn: false
      }
  },
  components:{
    SignInForm, Navbar
  },
    created: function() {
        let auth = this.$cookie.get('fritter-auth');
        if (auth) {
            this.isSignedIn = true;
        }

        eventBus.$on("login-success", (username) => {
            this.$cookie.set('fritter-auth', username);
            this.isSignedIn = true;
        })
    }
  }
  
</script>
<style scoped>
.create-account {
    display: flex;
    justify-content: center;
}
</style>