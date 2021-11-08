<template>
    <div class="navbar">
        <router-link class="logo-home" to="/">Fritter</router-link>
        <div v-if="!userName" class="nav-btn">
            <router-link class="nav-router-link" to="/signup">Sign Up</router-link>
            <router-link class="nav-router-link" to="/signin">Sign In</router-link>
        </div>
        <div v-else class="nav-btn">
            <div class="dropdown">
                <button class="dropbtn">{{ userName }} 
                <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                <router-link class="dropdown-item" to="/profile">Profile</router-link>
                <router-link class="dropdown-item" to="/settings">Settings</router-link>
                <div class="dropdown-item" v-on:click="signOut">Sign Out</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default ({
  name: 'Navbar',
  data() {
      return {
          userName: this.$cookie.get('fritter-auth')
      }
  },
    created(){
        eventBus.$on("signout-success", () => {
            this.$cookie.set("fritter-auth", '');
            console.log("cookie!");
            this.$router.go();
        });
    },
    methods:{
        signOut() {
        axios
            .post("/api/users/session/signout", {
            })
            .then(() => {
                console.log("signed out!");
                eventBus.$emit("signout-success", true);
            })
            .catch((error) => {
                eventBus.$emit('signout-success', true);
                if (error.response && error.response.status != 200){
                    this.error = error.response.data.error;
            }
            })
        }
    }
})
</script>
<style scoped>
.nav-template {
    display: flex;
    justify-content: center;
}
.navbar {
    background: #E8F0FC;
    color: grey;
    position: fixed;
    left: 8vw;
    top: 20px;
    width: 80vw;
    height: 80px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 40px;
    box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.nav-router-link {
    text-decoration: none;
    color: grey;
    padding: 5px 10px;
}
.nav-router-link:hover {
    background-color: grey;
    color: white;
    border-radius: 50px;
    transition: all 0.2s ease-out;
}

.logo-home {
    font-size: 3.5rem;
    text-decoration: none;
    font-size: 72px;
    background: -webkit-linear-gradient(120deg, #00E5FF, #1200FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: 20px;
}
.nav-btn {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
}

.dropdown {
  float: left;
  overflow: hidden;
  border-radius: 50px;
}

.dropdown:hover .dropbtn {
    background-color: grey;
    color: white;
    transition: all 0.2s ease-out;
}

.dropdown .dropbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: grey;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-item {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-item:hover {
    background-color: rgb(131, 219, 253);
    cursor: pointer;
    transition: all 0.2s ease-out;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>