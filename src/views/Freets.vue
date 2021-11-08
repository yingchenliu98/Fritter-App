<template>
  <div class="freets-page">
    <Navbar />
    <div class="body-container">
      <div class="freet-col">
          <ListAllFreets/>
          <ListAllRefreets/>
      </div>
      
      <div class="side-col">
        <CreatFreetForm  v-show="userName"/> 
        <SearchFreet />
      </div>
    </div>
  </div>
</template>


<script>
import ListAllFreets from '@/components/Freets/ListAllFreets.vue'
import CreatFreetForm from '@/components/Freets/CreatFreetForm.vue'
import SearchFreet from '@/components/Freets/SearchFreet.vue'
import Navbar from '@/components/NavBar/Navbar.vue';

import ListAllRefreets from "@/components/Freets/ListAllRefreets.vue";

export default {
  name: 'Freets',
  components:{
    ListAllFreets, CreatFreetForm, SearchFreet, Navbar, ListAllRefreets
    
  },
  data(){
    return {
      userName: this.$cookie.get('fritter-auth')
    }
  }
  

  }
  
</script>

<style scoped>
.freets-page {
  width: 100%;
  min-height: 98vh;
  overflow-x: hidden;
  background: #F4F8FE;
}
.body-container {
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 83vh;

}

.freet-col {
  width: 50%;
  margin: 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #E8F0FC;
  border-radius: 20px;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}
.side-col {
  width: 30%;
  margin: 0 30px;
  background: -webkit-linear-gradient(120deg,#00E5FF, #1200FF);
  border-radius: 20px;
  box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}

.router-link{
  background-color: rgb(180, 216, 233);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 12px;
  text-align: center;
  transition: all 200ms;
  vertical-align: baseline;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
