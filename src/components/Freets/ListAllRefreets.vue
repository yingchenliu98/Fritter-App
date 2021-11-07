<template>
    <div class="list-all-refreets">
        
        <span class="refreets"><Refreet  
        v-for="refreet in refreets"
        :key="refreet.id"
        :refreet="refreet"/></span>
  
    </div>

</template>
<script>
import Refreet from "@/components/Freets/Refreet.vue";
import axios from "axios";
import { eventBus } from "../../main";
export default{
    name: "ListAllReFreets",
    components: {
        Refreet
    },
    props:{
    
    },
    data(){
        return {
            refreets: [],
        }
    },
    created(){
        this.getRefreets();
        eventBus.$on(["refreet-success",
                    "upvote-freet-success", 
                    "unupvote-freet-success",
                    "delete-refreet-success",
                    "edit-freet-success"], ()=>{
        this.getRefreets();
    });
        
    },
    methods: {
        getRefreets(){
            axios.get("/api/refreets")
            .then((response) => {
               this.refreets = response.data
            })
            .catch(error => {
               alert(error)
           })
        }
    }
 
}

</script>

<style scoped>
.list-all-refreets {
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