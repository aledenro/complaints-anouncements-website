function validateEmail(correo) {
  const re = /^[^\.\s@][\w.-]+@[a-zA-Z\d-]+(\.[a-zA-Z]{2,})+$/;
  return re.test(correo);
}
