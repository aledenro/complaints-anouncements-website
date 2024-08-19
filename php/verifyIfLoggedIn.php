<?php
    session_start();
    if (!isset($_SESSION["id_Usuario"])){
        echo json_encode(array("loggedIn" => false));
    } else{
        echo json_encode(array("loggedIn" => true, "id_Usuario" => $_SESSION["id_Usuario"], "nombre" => $_SESSION["Nombre"], "apellidos" => $_SESSION["Apellidos"], "rol" => $_SESSION["rol"]));
    }

?>
