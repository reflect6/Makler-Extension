/* Add this JavaScript to your popupMain.js file */
document.addEventListener('DOMContentLoaded', function() {
  var loginForm = document.getElementById('login-form');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var spinner = document.getElementById('spinner');
  var checkmark = document.getElementById('checkmark');
  var crossmark = document.getElementById('crossmark');
  var messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    async function getPublicIpAddress() {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ipAddress = data.ip;
      return ipAddress;
    }

    async function setUserIpAddress() {
      const userIpAddress = await getPublicIpAddress();
      var userEmail = emailInput.value;
      var userPassword = passwordInput.value;

      // Show the loading spinner
      spinner.style.display = 'block';

      // Send a request to your backend server to check if the user's email and IP address are stored in your SQL database
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, password: userPassword, ip: userIpAddress })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Hide the loading spinner
        spinner.style.display = 'none';

        if (data.success) {
          // The user is logged in, display a success message and show the checkmark
          checkmark.style.display = 'block';
        } else {
          // The user is not logged in, display an error message and show the X mark
          crossmark.style.display = 'block';
        }
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
    }

    setUserIpAddress();
  });
});
