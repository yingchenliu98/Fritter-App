let freet_data = [];
let id_int = 0;

let refreet_data = [];
let id_int_re = 0;

/**
 * @typedef Freet
 * @prop {string} id - id of freet
 * @prop {string} content - content of freet
 * @prop {string} author - username
 * @prop {Date} timestamp - timestamp of last edit
 * @prop {Number} numUpvotes - number of upvotes of freet
 * @prop {string[]} upvoters - list of upvoters
 * @prop {string[]} numRefreets - number of refreets of freet
 * @prop {string[]} refreeters - list of refreeters
 */

/**
 * @class Freets
 * 
 * Stores all Freets and Refreets. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Freets {
  /**
   * Add a Freet to the collection.
   * 
   * @param {string} content - The content which the freet contains
   * @param {string} author - The creator of the freet
   * @return {Freet} - the newly created freet
   */
  static addOne(content, author) {
    let id = id_int.toString();
    let timestamp = new Date(Date.now());
    let upvoters = [];
    let refreeters = [];
    let numUpvotes = 0;
    let numRefreets = 0;
    const freet = { 
      id, content, author, timestamp, 
      numUpvotes, upvoters,
      numRefreets, refreeters} ;
    freet_data.push(freet);
    id_int += 1;
    return freet;
  }
  /**
   * Add a refreet to the collection.
   * @param {string} freetId - The id of the refreet being refreeted 
   * @param {string} content - The content which the freet contains
   * @param {string} refreeter - The refreeter of the freet
   * @return {Freet} - the newly created freet
   */
  static addOneRefreet(freetId, refreeter, comments) {
    let id = 're'+id_int_re.toString();
    let timestamp = new Date(Date.now());
    let numUpvotes = 0;
    let upvoters = [];
    let numRefreets = 0;
    const refreet = {
      id, freetId, refreeter, 
      comments, timestamp, 
      numUpvotes, upvoters, numRefreets} ;
    refreet_data.push(refreet);
    const freet = Freets.findById(freetId.toString());
    if (!freet.refreeters.includes(refreeter)){
      freet.refreeters.push(refreet.refreeter)
    }
    freet.numRefreets += 1
    id_int_re += 1;
    return refreet;
  }

  /**
   * View a Freet by Id.
   * 
   * @param {string} id - The id of the freet to find
   * @return {Freet | undefined} - the found freet with above id
   */
  static findById(id) {
    if (id.indexOf('re')===-1){
      const freet = freet_data.filter(freet => freet.id === id)[0];
      return freet
    }else{
      const refreet = refreet_data.filter(refreet => refreet.id === id)[0];
      return refreet 
    }
  
  }

  // /**
  //  * View a Freet by Id. 
  //  * 
  //  * @param {string} id - The id of the refreet to find
  //  * @return {Freet | undefined} - the found freet with above id
  //  */
  // static findByIdRefreet(id) {
  //   const refreet = refreet_data.filter(refreet => refreet.id === id)[0];
  //   return refreet 
  //   }


  /**
   * View a Freet by Author. 
   * 
   * @param {string} author - The author of the freet to find
   * @return {Freet[]} - the found freet with above author. Array or empty array
   */
  static findByAuthor(author) {
    const data_by_auth = freet_data.filter(freet => freet.author === author);
    return Freets.sortDataByDate(data_by_auth);
  }

  /**
   * View a Refreet by refreeter. 
   * 
   * @param {string} refreeter - The username
   * @return {Freet[]} - the found refreet by the refreeter. Array or empty array
   */
  static findByRefreeter(refreeter) {
    const data_by_refreeter =  refreet_data.filter(refreet => refreet.refreeter === refreeter);
    return Freets.sortDataByDate(data_by_refreeter);
  }

  /**
   * Sort a list of Freets or Refreets by timestamp.
   * 
   * @param {Freet} data - a list of freets or refreets
   * @return {Freet} - the newly sorted freet or refreets
   */
     static sortDataByDate(data){
      let timestamps = [];
      for (let frt of data){
        timestamps.push(frt.timestamp);
      }
  
      // sort `data` by the order of `timestamps`
      //1) combine the arrays:
      var list = [];
      for (var j = 0; j < timestamps.length; j++) {
          list.push({'timestamp': timestamps[j], 'data': data[j]});
      }
      //2) sort:
      list.sort(function(a, b) {
          return ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp == b.timestamp) ? 0 : 1));
      });
  
      //3) separate them back out:
      for (var k = 0; k < list.length; k++) {
          timestamps[k] = list[k].timestamp;
          data[k] = list[k].data;
      }
      return data.reverse();
    }
  
  /**
   * @return {Freet[]} an array of all of the Freets
   */
  static findAll() {
    return Freets.sortDataByDate(freet_data);

  }
  /**
   * @return {Refereet[]} an array of all of the Freets
   */
  static findAllRefreet() {
    return Freets.sortDataByDate(refreet_data);
  }
 
  /**
   * Edit a Freet's content.
   * @param {string} id - The name of the short to update
   * @param {string} new_content - The new URL to associate with the short
   * @return {Freet | undefined} - The updated short
   */
  static updateOne(id, new_content) {
    const freet = Freets.findById(id);
    freet.content = new_content;
    let new_timestamp = new Date(Date.now());
    freet.timestamp = new_timestamp
    return freet;
  }

  /**
   * Delete a Freet from the collection.
   * @param {string} id -  id of the freet
   * @return {Freet | undefined} - deleted Freet
   */
  static deleteOne(id) {
    const freet = Freets.findById(id);
    freet_data = freet_data.filter(s => s.id !== id);
    return freet;
  }
  /**
   * Delete a Refreet from the collection.
   * @param {string} id - id of the freet
   * @return {Freet | undefined} - deleted Freet
   */
  static deleteOneRefreet(id) {
    const refreet = Freets.findById(id);
    refreet_data = refreet_data.filter(refreet => refreet.id !== id);
    const freet = Freets.findById(refreet.freetId);
    if(freet!==undefined){
      freet.numRefreets-=1;
    }
    return refreet;
  }
  /**
   * get the Number of Upvotes received by a freet
   * @param {Number} id - the id of a freet
   * @return {Number} - Number of Upvotes
   */
  static getNumUpvote(id){
    const freet = Freets.findById(id);
    return freet.numUpvotes
  }

  /**
   * upvote a freet. 
   * a user can only upvote a freet once
   * once upvoting a freet successfully
   * 1. update the number of upvotes of a freet
   * 2. add the user to the upvoter list of the freet
   * @param {Number} id - the id of a freet
   * @param {String} username - current username
   * @return {Number} - Number of Upvotes
   */
  static upvote(id, username) {
    let freet = null;

    freet = Freets.findById(id);
    
    //const freet = Freets.findById(id);
    if(!freet.upvoters.includes(username)){
      freet.numUpvotes += 1;
      freet.upvoters.push(username)
    }
    return freet;
  }
    /**
   * revoke an upvote for a freet. 
   * a user can only revoke an upvote when he/she have upvoted it
   * once revoke upvoting a freet successfully
   * 1. update the number of upvotes of a freet
   * 2. remove the user to the upvoter list of the freet
   * @param {Number} id - the id of a freet
   * @param {String} username - current username
   * @return {Number} - Number of Upvotes
   */
  static revokeUpvote(id, username) {
    let freet = null;
    
    freet = Freets.findById(id);
    
    let index = freet.upvoters.indexOf(username);
    if (index > -1) {
        if(freet.numUpvotes>0){
          freet.numUpvotes -= 1;
        }
        freet.upvoters.splice(index, 1);
    }
    return freet;
  }
}


module.exports = Freets;