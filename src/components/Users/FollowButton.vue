<template>
    <div class="follow">
    <button
        class="button"
        v-show="userName!==freet.author"
        v-on:click="followed? UnFollow() : Follow()"
        ><i class="fa fa-plus" v-show="!followed" aria-hidden="true"></i>
        {{followButton.text}}
    </button>
    </div>

</template>
<script>

import axios from 'axios';
import { eventBus } from "../../main";
export default {
    name:"FollowButton",
    props: {
       freet: {
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
            followed: false,
            userProfile: null,
            followButton:{
                text: ' Follow'
            },
       }
   },
    created() {
      this.getUser();
        eventBus.$on(["follow-user-success","unfollow-user-success"], ()=>{
            this.getUser();
        });
    },
    methods:{
        getUser(){
        axios.get('api/users/' + this.userName)
            .then((response) => {
                this.userProfile = response.data.user;
                if(this.userProfile.followings.includes(this.freet.author)){
                    this.followed = true;
                }else{
                    this.followed = false;
                }

                this.followButton.text = this.followed ? ' Following' : ' Follow';
       })
    },
        Follow(){
            axios.post("api/users/following/" + this.freet.author)
            .then((response) => {
                eventBus.$emit("follow-user-success",{
                    data: response.data,
                }); 
                
            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })
            
       },
       UnFollow(){
           axios.put("api/users/unfollowing/" + this.freet.author)
            .then((response) => {
                eventBus.$emit("unfollow-user-success",{
                    data: response.data,
                }); 
            
                            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })


       }

   },
}
</script>
