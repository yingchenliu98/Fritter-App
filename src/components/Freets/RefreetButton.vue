<template>
    <div class="refreet">
    <div>
    <textarea
        class="refreet-comments"
        v-show="open"
        id="comments"
        name="comments"
        placeholder='comments(optional)....'
        v-model="comments"
    ></textarea>
    </div>
    <button  
      class="button" 
      @mouseover="showRefreeters=true"
      @mouseleave="showRefreeters=false"
      v-on:click="open? Refreet():AddComment()" 
      > <i class="fa fa-share blue-color"></i> {{refreetButton.text}} {{freet.numRefreets}}
    </button>
    <button  
      class="button" 
      v-show="open"
      v-on:click="open=false" 
      > <i class="fa fa-close"></i> Cancel
    </button>

    <div v-show="showRefreeters">
      <span> {{ freet.refreeters.join(', ')}}</span>
    </div>
    </div>

</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import axios from 'axios';
import { eventBus } from "../../main";
export default {
    name:"RefreetButton",
    props:{
       freet:{
           type: Object,
           required: true
       },
       userName:{
           type: String,
           required: true
       }
   },
    data() {
       return{
            refreetButton:{
                text: 'Refreet'
            },
            showRefreeters: false,
            Refreeted: false,
            open: false,
            comments: "",
            
       }
   },
    created() {
        
  },
    methods:{
    AddComment(){
        this.open = true;
        
    },
    Refreet(){
        axios
            .post("/api/refreets/post/" + this.freet.id, {
                comments: this.comments
                })
            .then((response) => {
                this.open=false;
                eventBus.$emit("refreet-success", {
                    data: response.data,
                    });
            this.comments=''
               
            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })
        },
  
    }
}
</script>
<style scoped>
.blue-color{
    color:#3CA3D8;
}
</style>