const express = require('express');
const Users = require('../models/Users');
const Freets = require('../models/Freets');
const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');
const router = express.Router();

/**Get all refreets(display it with all the freets) */
router.get('/',(req, res) => {
    res.status(200).json(Freets.findAllRefreet()).end()
});


/** create a refreet */

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
/** find a refreet by refreeter*/
router.get(
    '/:refreeter',
    (req, res) => {
        res.status(200).json(
            Freets.findByRefreeter(req.params.refreeter)
        ).end();
    }
);
/**delete a freet by id 
 * add more validation: refreet id exists/ delete selffreet
*/
router.delete(
    '/delete/:id',
    [
        authorizeThat.signedIn,
        validateThat.inputIdEmpty,
        validateThat.refreetIdExists,
        validateThat.editSelfRefreet,
    ],
    (req, res) => {
        const refreet = Freets.deleteOneRefreet(req.params.id);
        res.status(200).json({
            refreet, message: `Successfully deleted refreet id ${req.params.id} by user ${req.session.username}` 
        }).end();
    }
);

// /** edit comments */
// router.put(
//     '/edit/:id',
//     [
//         authorizeThat.signedIn,
//         validateThat.inputIdEmpty,
//         validateThat.refreetIdExists,
//         validateThat.editSelfRefreet,

//     ],
//     (req, res) => {
//         const refreet  = Refreets.updateComment(
//             req.params.id, req.body.comment
//         );
//         res.status(200).json({
//             refreet, message: `Successfully edited comments.`
//         })
//     }
// )



module.exports = router;