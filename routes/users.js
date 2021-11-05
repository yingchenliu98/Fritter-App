const express = require('express');

const Users = require('../models/Users');
const Freets = require('../models/Freets');

const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');
const router = express.Router();


/**
 * List all users.
 * 
 * @name GET /api/users
 * @return {User[]} - list of all stored shorts
 */

router.get('/', (req, res) => {
  res.status(200).json(Users.findAll()).end();
});


/**
 * Sign in.
 * 
 * @name POST /api/users/session/signin
 * @return {200} - if successfully signed in
 * @throws {400} - if already signed in the current session
 * @throws {404} - if the username is not found
 * @throws {400} - if the password does not match the records 
 * @throws {400} - if user's input is not in correct form
 */
router.post(
  '/session/signin',
  [
    validateThat.sessionNotNull,
    validateThat.usernameEmpty,
    validateThat.passwordEmpty,
    validateThat.usernameMatch,
    validateThat.passwordMatch,
    
  ],
  (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.status(200).json({
      username: req.session.username,
      message: `Hello ${req.session.username}! You have successfully signed in! Now you can post, edit, or delete your Freets!`
    }).end();
 
})


/**
 * Sign out.
 * 
 * @name POST /api/users/session/signout
 * @return {200} - if successfully log out
 * @throws {404} - if no user signed in
 */

router.post(
  '/session/signout',
  [
    validateThat.sessionNull
  ], 
  (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    res.status(200).json({ 
      message: 'Logging you out...Done!' 
    }).end();
})

/**
 * Create a user.
 * 
 * @name POST /api/users
 * 
 * @param {string} username - name of users (link will be /:user)
 * @param {string} password - password 
 * @return {User} - the created user
 * @throws {400} - if username is already taken 
 * @throws {400} - if user name or password is not in correct form
 */
router.post(
  '/', 
  [ 
    validateThat.usernameDuplicate,
    validateThat.passwordEmpty,
    validateThat.usernameEmpty,
    validateThat.usernameLength,
    validateThat.usernameType,
    validateThat.passwordLength,
  ],
  (req, res) => {
    const user = Users.addOne(req.body.username, req.body.password);
    res.status(200).json({ 
      message: `You have created a new account with username ${user.username}. Please sign in to make your first freet now!` 
    }).end();

});


/**
 * Update a User's username.
 * 
 * @name PUT /api/users/session/update/username
 * 
 * @param {string} newName - The new username to associate with the User
 * @return {User} - the updated User
 * @throws {401} - if user is not signed in
 * @throws {400} - if the new username has less than 1 character
 * @throws {400} - if no change is made to the old username 
 */
router.put(
  '/session/update/username/edit',
  [
    authorizeThat.signedIn,
    validateThat.usernameLength,
    validateThat.usernameType,
    validateThat.usernameUnchanged,
    validateThat.usernameDuplicate,

  ], 
  (req, res) => {

    // when changing username, update all usernames of this person's freets
    const user = Users.changeUsername(req.session.username, req.body.username);
    for(let i = 0; i < Freets.findAll().length; i++){
      if (Freets.findAll()[i].author === req.session.username){
        Freets.findAll()[i].author = user.username;
      }
    }
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({ message: `Successfully updated username. Your current username is ${user.username}. Please sign in again with your new username.`, });
});

/**
 * Update a User's password.
 * 
 * @name PUT /api/users/password
 * @param {string} newPassword - The new password to associate with the User
 * @return {User} - the updated User
 * @throws {401} - if user is not signed in
 * @throws {400} - if the new password has less than 1 character
 * @throws {400} - if no change is made to the old password 
 */
router.put(
  '/session/update/password/edit', 
  [
    authorizeThat.signedIn,
    validateThat.passwordLength,
    validateThat.passwordUnchanged,
  ],
  (req, res) => {
    const user = Users.changePassword(req.session.username, req.body.password);
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({ message: `${user.username}, you have successfully updated your password. Please sign in again with your new password.`, });
  
});

/**
 * Delete a User.
 * @name DELETE /api/users/delete/
 * @return {User} - the deleted user
 * @throws {401} - if user is not signed in
 */
router.delete(
  '/delete',
  [
    authorizeThat.signedIn,
  ] ,
  (req, res) => {
    const user = Users.deleteOne(req.session.username);
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({
      message: `You have deleted the User ${user.username} and logged out.`,
    }).end();
});
/**
 * Find a user by username
 * @name GET /api/users//:username
 * @return {User} - user
 * @throws {401} - if user is not signed in
 */
router.get(
  '/:username?',
  [
    authorizeThat.signedIn,
  ],
  (req, res) => {
    const user = Users.findOne(req.session.username);
    res.status(200).json({
      user, message: "Return user's profile information."
    }).end();
});

/**
 * Follow a User.
 * @name POST /api/users/following/:username?
 * @throws {401,400} - 401 if user is not signed in 400 if try to follow yourself
 */
/*current user following other user*/
router.post(
  '/following/:username?',
  [
    authorizeThat.signedIn,
    validateThat.followSelf,
  ],
  (req, res) => {
    const user = Users.addFollowing(req.session.username, req.params.username)
    res.status(200).json({
      user, message: "Successfully following."
    }).end();
});

/**
 * Unfollow a User.
 * @name PUT /api/users//unfollowing/:username?
 * @throws {401,400} - 401 if user is not signed in 400 if try to follow yourself
 */
router.put(
  '/unfollowing/:username?',
  [
    authorizeThat.signedIn,
    validateThat.followSelf,
  ],
  (req, res) => {
    const user = Users.removeFollowing(req.session.username, req.params.username)
    res.status(200).json({
      user, message: "Successfully unfollowing."
    }).end();
});


module.exports = router;