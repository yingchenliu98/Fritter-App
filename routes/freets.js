const express = require('express');
const Freets = require('../models/Freets');
const Users = require('../models/Users');
const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');
const router = express.Router();

/**
 * List all freets. No need to log in
 * 
 * @name GET /api/freets
 * 
 * @return {Freet[]} - list of all stored freets
 */
router.get('/', (req, res) => {
  res.status(200).json(Freets.findAll()).end();
});
router.get(
  '/:id?', 
  [
    validateThat.freetIdExists,
  ],
  (req, res) => {
  res.status(200).json(
    Freets.findById(req.params.id)
    ).end();
});



/**
 * List all freets by author. No need to log in
 * If author exists, respond empty list or a list of freets. If author does not exist, respond with error
 * @name GET /api/freets/show/:author
 * 
 * @return {Freet[]} - list of all freets by an Author
 */

router.get(
  '/show/:author?' ,
  [
    validateThat.inputAuthorEmpty, 
    validateThat.authorExists,
  ], 
  (req, res) => {
  res.status(200).json(
    Freets.findByAuthor(req.params.author)
    ).end();
});
/** create a refreet */

/**
 * Create a freet. You have to be a signed in user. Your freet cannot exceed 140 char.
 * 
 * @name POST /api/freets/create
 * 
 * @param {string} content - content of freet // params passed in are fields (from services.js)
 * @return {Freet} - the created freet
 * @throws {401, 403} - 401 Unauth: sign-in required; 403 Forbidden: exceeds 140 char
 */
router.post(
  '/create', 
  [
    authorizeThat.signedIn,
    validateThat.inputContentMinimum,
    validateThat.inputContentMaximum,
  ],
  (req, res) => {
    const freet = Freets.addOne(req.body.content, req.session.username);
    res.status(200).json(freet).end();

});

/**
 * Edit a freet. You have to sign in. You can only edit your own freets. Your freet cannot exceed 140 char
 * 
 * @name PUT /api/freets/edit/:id
 * 
 * @param {string} content - the new content
 * @return {Freet} - the updated freet
 * @throws {401, 403, 404} - 401 Unauth: sign-in required or accessing unauth'd content; 403 Forbidden: exceeds 140 char; 404 Not Found: id not found
 */
router.put(
  '/edit/:id?',
  [
    authorizeThat.signedIn,
    validateThat.inputIdEmpty,
    validateThat.freetIdExists,
    validateThat.editSelfFreet,
    validateThat.inputContentMinimum,
    validateThat.inputContentMaximum,
  ],
  (req, res) => {
    const freet = Freets.updateOne(req.params.id, req.body.content);
    res.status(200).json({ 
      freet, message: `Successfully edited freet id ${req.params.id} by user ${req.session.username}` 
    }).end();
});

/**
 * Delete a freet. You have to log in. You can only delete your own freet
 * @name DELETE /api/freets/delete/:id
 * @return {Freet} - the deleted freet
 * @throws {401, 404} - 401 Unauth: sign-in required or accessing unauth'd content; 404 Not Found: id not found
 */
router.delete(
  '/delete/:id?', 
  [
    authorizeThat.signedIn,
    validateThat.inputIdEmpty,
    validateThat.freetIdExists,
    validateThat.editSelfFreet,
  ],
  (req, res) => {
    const freet = Freets.deleteOne(req.params.id);
    res.status(200).json({ 
      freet, message: `Successfully deleted freet id ${req.params.id} by user ${req.session.username}` 
    }).end();
  
});
/**
 * Upvote a freet.
 * @name post /api/freets//upvote/:id
 * @return {Freet} - the upvoted freet
 * @throws {401} - 401 Unauth: sign-in required 
 */
router.post(
  '/upvote/:id?',
  [
    authorizeThat.signedIn,
  ],
  (req, res) => {
    const freet = Freets.upvote(req.params.id, req.session.username);
    Users.addUpvotedFreets(req.session.username, freet)
    res.status(200).json({
      freet, message: `Upvoted.`
    }).end();
  });

/**
 * Unupvote a freet.
 * @name put /api/freets/unupvote/:id
 * @return {Freet} - the unupvoted freet
 * @throws {401} - 401 Unauth: sign-in required 
 */
router.put(
    '/unupvote/:id?',
    [
      authorizeThat.signedIn,
    ],
    (req, res) => {
      const freet = Freets.revokeUpvote(req.params.id, req.session.username);
      Users.removeUpvotedFreets(req.session.username, freet)
      res.status(200).json({
        freet, message: `Unupvoted.`
      }).end();
    });
// /**
//  * get number of upvotes of a freet.
//  * @name get /upvote/number/:id?
//  * @return {Number} - number of upvotes
//  * @throw401} - 401 Unauth: sign-in required 
//  */
// router.get(
//   '/upvote/number/:id?',
//   (req, res) => {
//     const numUpvotes = Freets.getNumUpvote(req.params.id);
//     res.status(200).json({
//       numUpvotes, message: `Get Number of Upvoted.`
//     }).end();
//   });
    
router.post(
  '/post/:id?',
  [
      authorizeThat.signedIn,
      validateThat.freetIdExists,
  ],
  (req, res) => {
      const refreet = Freets.addOneRefreet(
          req.params.id,
          req.session.username,
          req.body.comments,
          )
      res.status(200).json({
          refreet, message: 'Refreeted successfully.'
      }).end();
  }
);
module.exports = router;