// Show an object on the screen.
// const axios = require('axios');
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => preParent.classList.remove('flashing'), 300);
}

// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse) {
  const fullResponse = axiosResponse.response === undefined
    ? axiosResponse
    : axiosResponse.response;
  const abridgedResponse = {
    data: fullResponse.data,
    status: fullResponse.status,
    statusText: fullResponse.statusText,
  };
  showObject(abridgedResponse);
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 * 
 * You can use axios to make API calls like this:
 * const body = { bar: 'baz' };
 * axios.post('/api/foo', body)
 *   .then(showResponse) // on success (Status Code 200)
 *   .catch(showResponse); // on failure (Other Status Code)
 * See https://github.com/axios/axios for more info
 */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */
function createUser(fields) {
  axios.post('/api/users', fields)
    .then(showResponse)
    .catch(showResponse);
}

function changeUsername(fields) {
  axios.put('/api/users/session/update/username/edit', fields)
    .then(showResponse)
    .catch(showResponse);
}

function changePassword(fields) {
  axios.put('/api/users/session/update/password/edit', fields)
    .then(showResponse)
    .catch(showResponse);
}


function deleteUser(fields) {
  axios.delete('/api/users/delete', fields)
    .then(showResponse)
    .catch(showResponse)
}

function signIn(fields) {
  axios.post('/api/users/session/signin', fields)
    .then(showResponse)
    .catch(showResponse)
}

function signOut(fields) {
  axios.post('/api/users/session/signout', fields)
    .then(showResponse)
    .catch(showResponse)
}

function viewAllFreets(fields) {
  axios.get('/api/freets/', fields)
    .then(showResponse)
    .catch(showResponse)
}

function viewFreetsByAuthor(fields) {
  axios.get('/api/freets/show/' + fields.author, fields)
    .then(showResponse)
    .catch(showResponse)
}

function createFreet(fields) {
  axios.post('/api/freets/create', fields)
    .then(showResponse)
    .catch(showResponse)
}

function editFreet(fields) {
  axios.put('/api/freets/edit/' + fields.id, fields)
    .then(showResponse)
    .catch(showResponse)
}

function deleteFreet(fields) {
  axios.delete('/api/freets/delete/' + fields.id, fields)
    .then(showResponse)
    .catch(showResponse)
}

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {};
      (new FormData(form)).forEach((value, key) => {
        data[key] = value;
      });
      handler(data);
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;