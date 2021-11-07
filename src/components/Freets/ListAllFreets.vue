<template>
    <div class="list-all-freets">
       
        <span class="freets"><Freet  
        v-for="freet in freets"
        :key="freet.id"
        :freet="freet"/></span>
  
    </div>

</template>

<script>
import Freet from "@/components/Freets/Freet.vue";
import axios from "axios";
import { eventBus } from "../../main";

export default{
    name: "ListAllFreets",
    components: {
        Freet
    },
    props:{
      
    },
    data(){
        return {
            freets: [],
            refreets: [],
        }
    },
    created(){
        this.getFreets();
        eventBus.$on(["create-freet-success",
                    "edit-freet-success",
                    "delete-freet-success",
                    "upvote-freet-success", 
                    "unupvote-freet-success",
                    "refreet-success"], ()=>{
            this.getFreets();
        });

        
        
 
    },
    methods: {
        getFreets(){
            axios.get("/api/freets")
            .then((response) => {
               this.freets = response.data
            })
            .catch(error => {
               alert(error)
           })
        },

        
    }
 
}

</script>

<style scoped>
.list-all-freets {
  height: 650px ;
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 300px;
  margin: 40px;
  background-color: #3CA3D8;
  overflow: auto;
  overflow-wrap: anywhere;
  
}


</style>