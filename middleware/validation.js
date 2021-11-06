const Freets = require('../models/Freets');
const Users = require('../models/Users');
const alphaExp = /^[a-zA-Z0-9]+$/;
//freets
const inputAuthorEmpty = (req, res, next) => {
    const author = req.params.author;
    if(author === undefined || author === ''){
        res.status(400).json({ 
            error: 'Please enter name of an author first.'
        }).end();
        return;
    }
    next();
};

const authorExists = (req, res, next) =>{
    const userExist = Users.findAllUsername().includes(req.params.author || req.body.author )
    if(! userExist ){ // author not found
        res.status(404).json({
          error: `Author ${req.params.author} is not found.`
        }).end();
        return;
    }
    next();
};

const inputContentMinimum = (req, res, next)=>{
    const inputContent = req.body.content;
    if (inputContent === undefined || inputContent === ''){
        res.status(403).json({
            error: 'Minimum 1 character.'
        }).end();
        return;
    }
    next();
};

const inputContentMaximum = (req, res, next) => {
    const inputContent = req.body.content;
    if (inputContent !== undefined && inputContent.length > 140){
        res.status(403).json({
            error: 'Maximum 140 character.'
        }).end();
        return;
    }
    next();
};

const inputIdEmpty = (req, res, next) => {
    const freetId = req.params.id;
    if(freetId === undefined || freetId === ''){
        res.status(400).json({
            eror: "Must enter the id of a freet."
        }).end();
        return;
    }
    next();
};

const freetIdExists = (req, res, next) => {
    const freetId = Freets.findById(req.params.id) 
    if(freetId === undefined){
        res.status(400).json({
            error: `Ooops! Content has been deleted by author.`
        }).end();
        return;
    }
    next();
};
const refreetIdExists = (req, res, next) => {
    const refreetId = Freets.findById(req.params.id) 
    if(refreetId === undefined){
        res.status(400).json({
            error: `Refreet with id ${req.params.id} not found, please try another one.`
        }).end();
        return;
    }
    next();
};
const editSelfFreet = (req, res, next) => {
    const freetAuthor = Freets.findById(req.params.id).author;
    const username = req.session.username;
    if(freetAuthor !== username){
        res.status(401).json({
            error: `Freet with id ${req.params.id} does not belong to you, you cannot make change to it.`
        }).end();
        return;
    }
    next();
};
const editSelfRefreet = (req, res, next) => {
    const refreeter = Freets.findById(req.params.id).refreeter;
    const username = req.session.username;
    if(refreeter !== username){
        res.status(401).json({
            error: `Refreet with id ${req.params.id} does not belong to you, you cannot make change to it.`
        }).end();
        return;
    }
    next();
};
//users
const usernameEmpty = (req, res, next) => {
    const username = req.body.username 
    if(username === undefined || username === '' ){
        res.status(400).json({ 
            error: 'Please enter your username.'
        }).end();
        return;
    }
    next();
};
const passwordEmpty = (req, res, next) => {
    const password = req.body.password;
    if(password === undefined || password === '' ){
        res.status(400).json({ 
            error: 'Please enter your password.'
        }).end();
        return;
    }
    next();
};
const usernameMatch = (req, res, next) =>{
    const usernameExist = Users.findOne(req.body.username)
    if(! usernameExist ){ // author not found
        res.status(404).json({
          error: `Username ${req.body.username} is not found.`
        }).end();
        return;
    }
    next();
};

const passwordMatch = (req, res, next) =>{
    const passwordRecord = Users.findOne(req.body.username).password;
    const passwordInput = req.body.password;
    if(passwordInput != passwordRecord){ // author not found
        res.status(404).json({
          error: "The password doesn't match our records."
        }).end();
        return;
    }
    next();
};


const sessionNotNull = (req, res, next) =>{
    if (req.session.username !== undefined ){
        res.status(400).json({ 
            error: 'You should log out first before signing in another account.' 

        }).end();
        return;
    }
    next();
};
const sessionNull = (req, res, next) =>{
    if (req.session.username === undefined ){
        res.status(400).json({ 
            error: 'You are not signed in. ' 
        }).end();
        return;
    }
    next();
};

const usernameDuplicate = (req, res, next) =>{
    const username = req.body.username;
    if (Users.findOne(username) !== undefined){
        res.status(400).json({ 
            error: `User ${req.body.username} already exists. Please choose another username.`,
        }).end();
        return;
    }
    next();
};

const usernameLength = (req, res, next) =>{
    const username = req.body.username;
    if (username !== undefined && username.length < 6){
        res.status(400).json({ 
            error: 'Username should be at least 6 characters.' 
        }).end();
        return;
    }
    next();
};
const usernameType = (req, res, next) =>{
    const username = req.body.username;
    if (!username.match(alphaExp)){
        res.status(400).json({ 
            error: 'Username: Please enter only alphabets or numbers.'
        }).end();
        return;
    }
    next();
};

const passwordLength = (req, res, next) =>{
    const password = req.body.password;
    if (password !== undefined && password.length < 8){
        res.status(400).json({ 
            error: 'Password should be at least 8 characters.'
        }).end();
        return;
    }
    next();
};
const usernameUnchanged = (req, res, next) =>{
    const curName = req.session.username;
    const newName = req.body.username;

    if (curName === newName){
        res.status(400).json({ 
            error: 'The new username must not be the same as the old one.' 
        }).end();
        return;
    }
    next();
};
const passwordUnchanged = (req, res, next) =>{
    const curPassword = req.session.password;
    const newPassword = req.body.password;

    if (curPassword === newPassword){
        res.status(400).json({ 
            error: 'The new password cannot be the same as the old one.'
        }).end();
        return;
    }
    next();
};

const followSelf = (req, res, next) => {
    const curUser = req.session.username;
    const followingUser = req.params.username;
    if (curUser === followingUser){
        res.status(400).json({ 
            error: 'You cannot follow/unfollow yourself.'
        }).end();
        return;
    }
    next();
};

module.exports = Object.freeze({
    inputAuthorEmpty,
    authorExists,
    inputContentMinimum,
    inputContentMaximum,
    inputIdEmpty,
    freetIdExists,
    refreetIdExists,
    editSelfFreet,
    editSelfRefreet,
    usernameEmpty,
    passwordEmpty,
    usernameMatch,
    passwordMatch,    
    sessionNotNull,
    sessionNull,
    usernameDuplicate,
    usernameLength,
    usernameType,
    passwordLength,
    usernameUnchanged,
    passwordUnchanged,
    followSelf,
  });