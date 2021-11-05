<template>
  <div>
    <Navbar />
    <section class="body-container">
      <SignUpForm />

    </section>
  </div>
</template>

<script>
import Navbar from '../components/NavBar/Navbar.vue';
import SignUpForm from '@/components/Users/SignUpForm.vue';

export default {
  name: 'Signup',
  components:{
    SignUpForm, Navbar
  }

  }
  
</script>