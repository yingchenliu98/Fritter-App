<template>
    <div class="user-profile">
        <div 
        class="info-container"
        v-if="userName">
        <h2>{{ userName }}</h2>
        <span>Following: {{followings? followings.length:0}} | 
            Followers: {{followers? followers.length:0}} 
           </span>
        </div>

        <div class="buttons-container">
            <button
                class="freets-link"
                @mouseover="showLikesFn()"
                >Upvoted({{numLikes}})
            </button>
            <button
                class="freets-link"
                @mouseover="showMyFreetsFn()"
                >My Freets ({{myFreets? myFreets.length:0}})
            </button>
            <button
                class="freets-link"
                @mouseover="showMyRefreetsFn()"
                >My Refreets ({{myFreets? myRefreets.length:0}})
            </button>
            <button
                class="freets-link"
                @mouseover="showFollowingsFn()"
                >Followings ({{followings? followings.length:0}})
            </button>
            <button
                class="freets-link"
                @mouseover="showFollowersFn()"
                >Followers ({{followers? followers.length:0}} )
            </button>
        </div>

        <div class="body-container">
            <div 
            class='upvoted-freets'
            v-show='showLikes'
            >
            <Freet
            v-for='freet in likes'
            :key='freet.id'
            :upvoted='true'
            :freet='freet'
            />
            <Refreet
            v-for='refreet in likesRe'
            :key='refreet.id'
            :upvoted='true'
            :refreet='refreet'
            />
         
            </div>

            <div 
            class='posted-freets'
            v-show='showMyFreets'>
            <Freet
            v-for='freet in myFreets'
            :key='freet.id'
            :freet='freet'
            />
            </div>
            
            <div 
            class='upvoted-freets'
            v-show='showMyRefreets'>
            <Refreet
            v-for='refreet in myRefreets'
            :key='refreet.id'
            :refreet='refreet'
            />
            </div>

            <div 
            class='followings'
            v-show='showFollowings'
            >
            <ul>
                <li v-for='(following, index) in followings' :key='index'>
                <Followings :followingUser=following />
                </li>
            </ul>
            </div>

            <div 
            class='followers'
            v-show='showFollowers'
            >
            {{ followers? followers.join(', '): null}}
            </div>

        </div>
        
    </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from 'axios';
import Freet from '@/components/Freets/Freet.vue';
import Refreet from '@/components/Freets/Refreet.vue';
import Followings from '@/components/Users/Followings.vue';

export default {
    name: "UserProfile",
    data(){
        return {
            userName: this.$cookie.get('fritter-auth'),
            userProfile: [],
            myFreets: [],
            myRefreets: [],
            upvotedFreetsId:[],
            likesRe: [],
            likes: [],
            followers: [],
            followings: [],
            showLikes: true,
            showMyFreets: false,
            showFollowings: false,
            showFollowers:false,
            showMyRefreets:false,
            numLikes: 0,
        }
    },
    components: {
        Freet,
        Refreet,
        Followings
    
    },
    created(){
        this.getUser()
        this.getFreets()
        this.getRefreets()
        eventBus.$on([ "delete-freet-success",
                    "edit-freet-success",
                    "delete-refreet-success",
                    "create-freet-success",
                    // "upvote-freet-success", 
                    // "unupvote-freet-success",
                    "refreet-success"], ()=>{
        this.getUser();
        this.getFreets()
        this.getRefreets()
    });
        
        
  
    },
    methods:{
        getUser(){
            axios.get('/api/users/'+this.userName)
                .then((response) => {
                    eventBus.$emit("get-user-success",{
                        data: response.data,
                });
                this.userProfile = response.data.user;
                this.upvotedFreetsId = this.userProfile.upvotedFreets;
                this.followers = this.userProfile.followers;
                this.followings = this.userProfile.followings;
                console.log(this.upvotedFreetsId)
                this.displayLikes(this.upvotedFreetsId);
        
            })
            .catch((error) => {
                if (error.response && error.response.status != 200){
                    alert(error.response.data.error)
                }
            })
            
        },
        getFreets(){
            axios.get('/api/freets/show/'+this.userName)
            .then((response) => {
                eventBus.$emit("get-freet-success",{
                    data: response.data,
            });
            this.myFreets = response.data;
        })
        .catch((error) => {
        if (error.response && error.response.status != 200){
            alert(error.response.data.error)
        }
        })

        },
        getRefreets(){

        axios.get('/api/refreets/'+this.userName)
            .then((response) => {
                eventBus.$emit("get-refreet-success",{
                    data: response.data,
            });

            this.myRefreets = response.data;
        })
        .catch((error) => {
        if (error.response && error.response.status != 200){
            alert(error.response.data.error)
        }
        })
        },

        showLikesFn(){
            this.showMyFreets=false;
            this.showFollowings=false;
            this.showFollowers=false;
            this.showMyRefreets=false;
            this.showLikes=true;
            
        },
        displayLikes(ids){
            for (const id of ids){
                console.log(id)
                axios.get('api/freets/' + id)
                    .then((response) => {
                    if (response.data!==undefined){
                        this.numLikes+=1;
                        if(response.data.id.indexOf('re') !== -1){
                           this.likesRe.push(response.data)
                        }else{
                        this.likes.push(response.data)
                        }
                    }
                    })
                    .catch((error) => {
                    if (error.response && error.response.status != 200){
                        return false
                    }
                    })
            }
   
        },
        showMyFreetsFn(){
            this.showLikes=false;
            this.showFollowings=false;
            this.showFollowers=false;
            this.showMyRefreets=false;
            this.showMyFreets=true;
            
        },
        showFollowingsFn(){
            this.showMyFreets=false;
            this.showLikes=false;
            this.showFollowers=false;
            this.showMyRefreets=false;
            this.showFollowings=true;
        },
        showFollowersFn(){
            this.showMyFreets=false;
            this.showLikes=false;
            this.showFollowings=false;
            this.showMyRefreets=false;
            this.showFollowers=true;

        },
        showMyRefreetsFn(){
            this.showMyFreets=false;
            this.showLikes=false;
            this.showFollowings=false;
            this.showFollowers=false;
            this.showMyRefreets=true;
        }

    }
}

</script>
<style scoped>

.body-container{
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.body-container div{
    padding: 30;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.buttons-container{
    margin-top: 80px;
    display: flex;
    justify-content: space-around;

}
.freets-link {
    border-radius: 5px;
    color: white;
    font-weight: 700;
    background-color: #3CA3D8;
    padding: 20px;
    text-decoration: none;
}
.freets-link:hover{
    filter: brightness(1.1);
    transition: All 0.2s ease-out;
}

.upvoted-freets {
  display: flex;
  flex-wrap: wrap;
  width: 32em;
  height: 40em auto;
  overflow:auto;
  background-color: #3CA3D8;
  margin: 1em auto;
  
}
.posted-freets {
  display: flex;
  flex-wrap: wrap;
  width: 32em;
  height: 40em auto ;;
  overflow:auto;
  background-color: #3CA3D8;
  margin: 1em auto;
  
}
.re-freets{
  display: flex;
  flex-wrap: wrap;
  width: 32em;
  height: 40em auto;
  overflow:auto;
  background-color: #3CA3D8;
  margin: 1em auto;

}
.followings{
  display: flex;
  flex-wrap: wrap;
  width: 32em;
  height: 40em auto ;;
  margin: 1em auto;

}
.followers{
  display: flex;
  flex-wrap: wrap;
  width: 32em;
  height: 40em auto ;;
  overflow:auto;
  margin: 1em auto;

}
.followings ul {
  list-style-type: none;
  padding: 0;
  margin: 0
}
.upvoted-freets > div {
  flex: 50%;
}
.posted-freets  > div {
  flex: 50%;
}

@media only screen and (max-width: 768px) {
  .flex > div {
    flex: 100%;
  }
}

</style>