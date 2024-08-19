function verifyIfLoggedIn() {
  return fetch("/php/verifyIfLoggedIn.php")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
