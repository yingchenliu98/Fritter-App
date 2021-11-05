<template>
    <div>
        <Navbar />
        <section class="body-container">
            <div v-if="userName">
                <h1> Welcome, {{ userName }}!</h1>
            </div>
            <div v-else class="body-container">
                <h1>Welcome to Fritter!</h1>
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
<style scope>
.body-container{
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.freets-link {
    border-radius: 5px;
    color: white;
    font-weight: 700;
    background-color: #3CA3D8;
    padding: 20px;
    text-decoration: none;
}
.freets-link:hover {
    filter: brightness(1.1);
    transition: All 0.2s ease-out;
}
</style>