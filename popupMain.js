
const storedToken = localStorage.getItem('myToken');



async function getPublicIpAddress() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const ipAddress = data.ip;
  return ipAddress;
}

function showAlert(message) {
  // Get a reference to the alert box
  const alertBox = document.getElementById('custom-alert');

  // Set the message text
  alertBox.querySelector('.message').textContent = message;

  // Show the alert box
  alertBox.style.display = 'block';

  // Add a click event listener to the OK button
  alertBox.querySelector('.ok-button').addEventListener('click', hideAlert);

  // Hide the alert box after 3 seconds
  setTimeout(hideAlert, 3000);

  function hideAlert() {
    // Remove the event listener from the OK button
    alertBox.querySelector('.ok-button').removeEventListener('click', hideAlert);

    // Hide the alert box
    alertBox.style.display = 'none';
    window.location.href = "popupMain.html";
  }
}

async function storeToken() {
  fetch('http://localhost:3000/storeToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: storedToken
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          console.log('saved Token in SQL')
        }else {
          return false;
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
};

document.addEventListener('DOMContentLoaded', function () {
  async function checkToken() {
    const userIpAddress = await getPublicIpAddress();
    const storedToken = localStorage.getItem('myToken');
    console.log('User IP address:', userIpAddress);
    console.log('Stored token:', storedToken);
    fetch('http://localhost:3000/checkToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip: userIpAddress,
          token: storedToken
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log('Response from server:', data);
        if (data.success) {
          // The user is logged in, display a success message
          console.log('User is logged in. Redirecting to popup.html...');
          window.location.href = "popup.html";
        } else {
          // The user is not logged in, display the login form
          console.log('User is not logged in. Displaying login form...');
          var loginForm = document.getElementById('login-box');
          var emailInput = document.getElementById('email');
          var passwordInput = document.getElementById('password');
          var loadingGif = document.getElementById('loading-container-gif');

          loginForm.style.display = 'block';
          loadingGif.style.display = 'none';

          const inputs = document.querySelectorAll(".login-box .user-box input");

          inputs.forEach((input) => {
            input.addEventListener("input", () => {
              if (input.value.trim() !== "") {
                input.classList.add("has-value");
              } else {
                input.classList.remove("has-value");
              }
            });
          });

          loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            loadingGif.style.display = 'block';
            loginForm.style.display = 'none';

            async function setUserIpAddress() {
              const userIpAddress = await getPublicIpAddress();
              var userEmail = emailInput.value;
              var userPassword = passwordInput.value;

              // Send a request to your backend server to check if the user's email and IP address are stored in your SQL database
              fetch('http://localhost:3000/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    ip: userIpAddress
                  })
                })
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log('Response from server:', data);
                  if (data.success) {
                    // The user is logged in, display a success message
                    localStorage.setItem('myToken', token);
                    storeToken();
                    console.log('User is logged in. Redirecting to popup.html...');
                    window.location.href = "popup.html";
                  } else {
                    // The user is not logged in, display an error message
                    console.log('User is not logged in. Displaying error message...');
                    showAlert('შეცდომა სისტემაში შესვლის დროს');
                  }
                })
                .catch(function (error) {
                  console.error('Error:', error);
                });
            }

            setUserIpAddress();
          });
        }
      })
  }
  checkToken();
});
