const containerUserLogin = document.getElementById("containerUserLogin");

function renderLoginUsername(data) {
  let componentLogin;

  if (data["loggedIn"] === false) {
    componentLogin = (
      <div class="col-2 d-flex justify-content-end align-items-center">
        <a class="btn btn-sm btn-outline-secondary" href="/otros/login.html">
          Log In
        </a>
      </div>
    );
  } else {
    componentLogin = (
      <div class="row">
        <div class="col-2 d-flex justify-content-end align-items-center">
          <i class="bi bi-person-circle"></i>{" "}
          <a
            class="nav-item my-auto text-dark"
            href={`/usuario/perfil.html?id_usuario=${data["id_Usuario"]}`}
          >
            {` ${data["nombre"]} ${data["apellidos"]}`}
          </a>
        </div>
        <div class="col-2 d-flex justify-content-end align-items-center">
          <a class="btn btn-sm btn-outline-secondary" id="btnLogOut">
            Log Out
          </a>
        </div>
      </div>
    );
  }

  ReactDOM.render(componentLogin, containerUserLogin);

  const btnLogOut = document.getElementById("btnLogOut");
  if (btnLogOut) {
    btnLogOut.addEventListener("click", function () {
      logout();

      window.location.href = "/index.html";
    });
  }
}

function logout() {
  return fetch("/php/logout.php")
    .then((response) => response.json())
    .then((data) => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

async function main() {
  const data = await verifyIfLoggedIn();
  await renderLoginUsername(data);
}

main();
