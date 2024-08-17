const formLogin = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");

let valueUsername;
let valuePassword;

function getValues() {
  valueUsername = username.value;
  valuePassword = password.value;
}

function hideAlerts() {
  error.hidden = true;
}

function handleActionOnServerResponse(success, message) {
  if (success) {
    if (message === "Login Exitoso") {
      window.location.href = "/index.html";
      return;
    } else if (message === "La contraseña no coincide.") {
      error.innerHTML = `${message} Trate nuevamente.`;
      error.hidden = false;
      return;
    } else if (message === "El usuario no existe.") {
      error.innerHTML = `${message} Por favor registrese.`;
      error.hidden = false;
      return;
    } else if (message === "Error al hacer login.") {
      error.innerHTML = message;
      error.hidden = false;
      return;
    }
  } else {
    error.innerHTML = message;
    error.hidden = false;
    return;
  }
}

function login() {
  getValues();
  fetch("/php/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: valueUsername,
      contrasena: valuePassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const success = data["success"];
      const message = data["message"];

      handleActionOnServerResponse(success, message);
    });
}

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAlerts();
  login();
});
