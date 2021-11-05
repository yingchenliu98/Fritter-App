<template>
  <div id="app">
    <router-view ></router-view>
  </div>
  
</template>

<script>
//import { eventBus } from "./main";

export default {
  name: 'App',
  beforeCreate: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (!authenticated) {
      this.$router.push("/");
    }
  },
  components: {},
  computed: {},
  methods: {},
};
</script>

<style>
</style>
