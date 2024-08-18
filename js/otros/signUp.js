const signUp = document.getElementById("sign-up");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const username = document.getElementById("username");
const numero = document.getElementById("numero");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");

let valueNombre;
let valueApellidos;
let valueUsername;
let valueTelefono;
let valuRepeatPassword;
let valuePassword;

function getValues() {
  valueNombre = nombre.value;
  valueApellidos = apellidos.value;
  valueUsername = username.value;
  valueTelefono = numero.value;
  valuRepeatPassword = repeatPassword.value;
  valuePassword = password.value;
}

function setEmptyValues() {
  nombre.value = "";
  apellidos.value = "";
  username.value = "";
  numero.value = "";
  repeatPassword.value = "";
  password.value = "";
}

function hideAlerts() {
  error.hidden = true;
  resultado.hidden = true;
}

function handleActionOnServerResponse(success, message) {
  if (success) {
    if (message === "Usuario creado.") {
      resultado.innerHTML = message;
      resultado.hidden = false;
      return true;
    } else if (message === "Ya existe un usuario con ese correo.") {
      error.innerHTML = message;
      error.hidden = false;
      return false;
    }
  } else {
    error.innerHTML = message;
    error.hidden = false;
    return false;
  }
}

function validateFormatData() {
  const validEmail = validateEmail(valueUsername);
  if (!validEmail) {
    alert("Verifique el formato el correo electronico.");
    return false;
  }

  const validNum = validateNumTel(valueTelefono);
  if (!validNum) {
    alert("Verifique el formato del número de teléfono.");
    return false;
  }

  console.log(valuePassword);

  const passwordsMatch = valuePassword === valuRepeatPassword;
  if (!passwordsMatch) {
    alert("Verifique que las contraseñas coincidan.");
    return false;
  }

  const validPassword = validatePassword(valuePassword);
  if (!validPassword) {
    alert(
      "Verifique el formato de la contraseña. Esta debe ser de minimo 8 caracteres, poseer 1 mayuscula y minuscula, 1 numero y 1 caracter especial. No debe ser más larga que 15 caracteres "
    );
    return false;
  }

  return true;
}

function register() {
  getValues();

  if (!validateFormatData()) {
    return;
  }

  fetch("/php/signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: valueNombre,
      apellidos: valueApellidos,
      correo: valueUsername,
      numero: valueTelefono,
      contrasena: valuePassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const success = data["success"];
      const message = data["message"];

      if (handleActionOnServerResponse(success, message)) {
        setEmptyValues();
      }
    });
}

signUp.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAlerts();
  register();
});
