<template>
  <div>
    <Navbar />
    <div class="body-container">
      <!-- <UserProfile v-bind:signedInUser="signedInUser"/> -->
       <div class="col-side" id="col1"><h2>Lists of All Freets</h2><ListAllFreets/></div>
       <div class="col" id="col2"><h2>Lists of All ReFreets</h2><ListAllRefreets/></div>
       <div class="col-side" id="col3">
        
         <CreatFreetForm  v-show="userName"/> 
         <SearchFreet /></div>
      
      
       
     
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
.body-container {
  display: flex;
  justify-content: space-between;
  justify-content: center;
  flex-direction: row;
  height: 100vh;

}
.body-container > div > h2{
  margin-left: 30px;
}
/* .col-side {
  flex: 1
} */
.body-container > div + div {
  border-left: 2px solid rgba(0, 0, 0, 0.12);
}

.col1 {
  border-right: 2px solid rgba(0, 0, 0, 0.12);
}

.col3{
  border-left: 2px solid rgba(0, 0, 0, 0.12);
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
