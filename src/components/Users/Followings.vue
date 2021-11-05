<template>
    <div class='followings'>
        <span>{{followingUser}}</span>
        <button
        class="button"
        v-on:click="UnFollow()"
        >Unfollow
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from "../../main";
export default {
    name: 'Followings',
    props: {
        followingUser: {
            type: String,
            required: true
        },
    },
    data () {
        return{
            followed: true,
        }
    },
    methods:{
       UnFollow(){
           axios.put("api/users/unfollowing/" + this.followingUser)
            .then((response) => {
                eventBus.$emit("unfollow-user-success",{
                    data: response.data,
                }); 
                window.location.reload();
                            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                alert(error.response.data.error)
                }
            })
       }
    }
}
</script>
