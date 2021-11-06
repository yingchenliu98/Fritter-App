let data = [];

/**
 * @typedef User
 * @prop {string} username - some string, valid in a URL path
 * @prop {string} password - some string, valid in a URL path
 * @prop {string{}} upvotedFreets - The list of upvoted freets
 * @prop {string{}} reFreets - The list of upvoted freets
 * @prop {string{}} followers - The list of followers
 * @prop {string{}} followings - The list of followings
 */

/**
 * @class Users
 * 
 * Stores all Users' accounts. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  

  /**
   * Add a User to the collection.
   * 
   * @param {string} username - The name of the user
   * @param {string} password - The password of the user
   * @param {string[]} upvotedFreets
   * @return {User} - the newly created user
   */
  static addOne(username, password) {
    const upvotedFreets =  [];
    const followers = [];
    const followings = [];
    const user = { 
      username, 
      password,
      upvotedFreets,
      followers,
      followings,
    };
    data.push(user);
    return user;
  }

  /**
   * @return {User[]} an array of all of the Users
   */
  static findAll() {
    return data;
  }

  /**
   * @return {Array} an array of all usernames
   */
  static findAllUsername(){
    let username_list = []
    for (let i=0; i<data.length; i++){
      username_list.push(data[i].username)
    }
    return  username_list
  }

  /**
   * Find a User by username.
   * 
   * @param {string} username - The name of the User to find
   * @return {User | undefined} - the found User with above username
   */
  static findOne(username) {
    return data.filter(user => user.username === username)[0];
  }


  /**
   * Update a User's username.
   * 
   * @param {string} username - The username of the User to update
   * @param {string} newName - The new username to associate with the User
   * @return {User | undefined} - The updated User
   */
  static changeUsername(username, newName) {
    const user = Users.findOne(username);
    user.username = newName;
    return user;
  }

  /**
   * Update a User's password.
   * 
   * @param {string} username - The username of the User to update
   * @param {string} newPassword - The new password to associate with the User
   * @return {User | undefined} - The updated User
   */
  static changePassword(username, newPassword) {
    const user = Users.findOne(username);
    user.password = newPassword;
    return user;
  }

  /**
   * Delete a User from the collection.
   * 
   * @param {string} username - name of User to delete
   * @return {User | undefined} - deleted User
   */
  static deleteOne(username) {
    const user = Users.findOne(username);
    data = data.filter(s => s.username !== username);
    return user;
  }
  /**
   * Add an upvoted freet to user's upvoted freets list. 
   * @param {string} username - name of current User 
   * @param {Freets} freet - a freet upvoted
   * @return {User} - current User A
   */
  static addUpvotedFreets(username, freet){
    const user = this.findOne(username);
    if (!user.upvotedFreets.includes(freet.id)){
      user.upvotedFreets.push(freet.id);
    }
    return user;
  }
  /**
   * Remove an upvoted freet from user's upvoted freets list. 
   * @param {string} username - name of current User 
   * @param {Freets} freet - an revoked upvoted freet 
   * @return {User} - current User A
   */
  static removeUpvotedFreets(username, freet){
    const user = this.findOne(username);
    const index = user.upvotedFreets.indexOf(freet.id);
    if (index !== -1) {
        user.upvotedFreets.splice(index, 1);
    }
    return user;
  }

  static addReFreets(username, refreet){
    const user = this.findOne(username);
    user.reFreets.push(refreet);
    return user;
  }
  /**
   * Remove an upvoted freet from user's upvoted freets list. 
   * @param {string} username - name of current User 
   * @param {Freets} freet - an revoked upvoted freet 
   * @return {User} - current User A
   */
  static removeReFreets(username, refreet){
    const user = this.findOne(username);
    const index = user.reFreets.indexOf(refreet);
    if (index !== -1) {
        user.reFreets.splice(index, 1);
    }
    return user;
  }

   /**
   * Add a following. 
   * When A follows B,
   * add B to A's followings and add A to B's followers.
   * @param {string} username - name of current User A
   * @param {string} followingName - name of User to follow B
   * @return {User} - current User A
   */
  static addFollowing(username, followingName) {
    const currentUser = Users.findOne(username);
    const followingUser = Users.findOne(followingName);
    if(!currentUser.followings.includes(username)){
      currentUser.followings.push(followingName)
    }
    if(!followingUser.followers.includes(username)){
      followingUser.followers.push(username)
    }
    return currentUser;
  }
  /**
   * Revoke a following. 
   * When A revokes a following of B,
   * remove B from A's followings and remove A from B's followers.
   * @param {string} username - name of current User A
   * @param {string} followingName - name of User to unfollow B
   * @return {User} - current User A
   */
  static removeFollowing(username, unfollowingName){
    
    const currentUser = Users.findOne(username);
    const unfollowingUser = Users.findOne(unfollowingName);
    //const unfollowingUser = Users.findOne(unfollowingName);
    const index1 = currentUser.followings.indexOf(unfollowingName);
    if (index1 > -1){
      currentUser.followings.splice(index1, 1)
    }
    const index2 = unfollowingUser.followers.indexOf(username);
    if (index2> -1){
      unfollowingUser.followers.splice(index2, 1)
    }
    return currentUser;
  }
  /**
   * Return a list of followings of a user by username. 
   * @param {string} username - name of a user
   * @return { Array | undefined} - the following list of the input username
   */
  static getFollowing(username){
    const currentUser = Users.findOne(username);
    if(currentUser!==undefined){
      return currentUser.followings
    }else{
      return
    }
  }
  /**
   * Return a list of followers of a user by username. 
   * @param {string} username - name of a user
   * @return { Array | undefined} - the follower list of the input username
   */
  static getFollower(username){
    const currentUser = Users.findOne(username);
    if(currentUser!==undefined){
      return currentUser.followers
    }else{
      return
    }
  }
  /**
   * check the following relation of two users
   * @param {string} username - name of a user
   * @param {string} otherName - name of a user
   * @return {boolean} - whether or not following
   */
  static checkFollowing(username, otherName){
    const followings = this.getFollowing(username);
    if (followings.includes(otherName)){
      return true
    }
    else{
      return false
    }
  }

}


module.exports = Users;