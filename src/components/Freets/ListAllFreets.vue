<template>
    <div class="list-all-freets">
        <h2 class="section-title">Freets</h2>
        <div class="freets">
            <Freet  
                v-for="freet in freets"
                :key="freet.id"
                :freet="freet"/>
        </div>
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
    width: 40%;
    margin: 0 20px;
}
.section-title {
    width: 80%;
    height: 30px;
    padding: 10px 20px;
    border-radius: 30px;
    background: -webkit-linear-gradient(120deg,#00E5FF, #1200FF);
    box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
    color: white;
}
.freets {
    min-height: 650px;
    width: 100%;
    background: #F4F8FE;
    overflow: auto;
    overflow-wrap: anywhere;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 1px 1px 6px 0 rgba(31,38,135,0.3);
}


</style>