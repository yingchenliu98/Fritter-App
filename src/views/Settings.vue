<template>
    <div>
        <Navbar />
        <section class="body-container">
            <div v-if="userName">
                <h2 class="settings-title">Settings</h2>
            </div>
            <div class="col">
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
<style scoped>
.body-container{
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.col {
    display: flex;
    padding-left: 250px;
}

</style>