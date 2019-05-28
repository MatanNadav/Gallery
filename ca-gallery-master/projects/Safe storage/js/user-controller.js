'user strict';

function onInit() {
   createUsers();
   console.log(gUsers);
   
}


function onDoLogin(ev) {
   if (ev.key === 'Enter' || ev.button === 0) {

      var username = document.querySelector('.user').value;
      var password = document.querySelector('.pass').value;
      document.querySelector('.user').value = '';
      document.querySelector('.pass').value = '';

      var loggedInUser = doLogin(username, password);

      if (loggedInUser) {
         getDisplaySafe(loggedInUser);
         saveToStorage('logInUser', loggedInUser)
      }
      if (loggedInUser.isAdmin) document.querySelector('.logged-in a').style.display = 'block';

   } else return;


}


function getDisplaySafe(loggedInUser) {
   var greet = document.querySelector('.login-container h2');
   greet.style.display = 'block';
   var safeContent = document.querySelector('.logged-in');
   safeContent.querySelector('h1').innerText += loggedInUser.username;
   safeContent.style.display = 'block';
}

function onDoLogout() {
   doLogout();
   var greet = document.querySelector('.login-container h2');
   greet.style.display = 'none';
   var safeContent = document.querySelector('.logged-in');
   safeContent.querySelector('h1').innerText = '';
   safeContent.style.display = 'none';


}