<template>
    <div class="list-all-refreets">
        <h2 class="section-title">Refreets</h2>
        <div class="refreets">
            <Refreet  
                v-for="refreet in refreets"
                :key="refreet.id"
                :refreet="refreet"/>
        </div>
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
.refreets {
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