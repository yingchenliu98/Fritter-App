<template>
    <div>
        <Navbar />
        <section class="body-container">
            <div v-if="userName">
                <h2>Settings</h2>
            </div>
            <div style="display: flex;">
                <UpdateUsername />
                <UpdatePassword />
                <DeleteAccount />
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import UpdateUsername from '../components/Users/UpdateUsernameForm.vue';
import UpdatePassword from '../components/Users/UpdatePasswordForm.vue';
import DeleteAccount from '../components/Users/DeleteAccountForm.vue';

export default {
    name: 'setting',
    components:{
        UpdateUsername, UpdatePassword, DeleteAccount, Navbar
    },
    data() {
        return {
            userName: this.$cookie.get('fritter-auth')
        }
    },
}
</script>