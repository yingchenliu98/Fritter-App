<template>
    <div>
        <Navbar />
        <div class="body-container">
            <UserProfile />  
        </div>
    </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import UserProfile from '../components/Users/UserProfile.vue';

export default {
    name: "Profile",
    data(){
        return {
            userName: this.$cookie.get('fritter-auth'),
        }
    },
    components: {
        Navbar, 
        UserProfile
    },
}

</script>
<style scoped>
.body-container{
    margin-top: 100px;
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