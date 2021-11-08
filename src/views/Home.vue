<template>
    <div>
        <Navbar />
        <section class="body-container">
            <div v-if="userName">
                <h1 class="welcome"> Welcome, {{ userName }}!</h1>
            </div>
            <div v-else class="body-container">
                <h1 class="welcome">Welcome to Fritter!</h1>
                <p>This is the best place to see what’s happening in your world.</p>
                <p>Find some people and topics to follow now.</p>
            </div>
            <br>
            <router-link class="freets-link" to="/freets">Let's go!</router-link>
        </section>
    </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';

export default {
    name: "Home",
    data(){
        return {
            userName: this.$cookie.get('fritter-auth')
        }
    },
    components: {
        Navbar
    }
}

</script>
<style scoped>
.body-container{
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.freets-link {
    border-radius: 100px;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    background: -webkit-linear-gradient(120deg,#00E5FF, #1200FF);
    padding: 30px;
    text-decoration: none;
    box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.freets-link:hover {
    filter: brightness(1.1);
    transition: All 0.2s ease-out;
}
.welcome {
    font-size: 3rem;
}
</style>