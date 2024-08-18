function validateEmail(correo) {
  const re = /^[^\.\s@][\w.-]+@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;
  return re.test(correo);
}

function validateNumTel(numero) {
  const re = /^[682]?\d{7}$/;
  return re.test(numero);
}

function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,15}$/;
  return re.test(password);
}
