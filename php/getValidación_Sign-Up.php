<?php

include('dbConnection.php');
if(isset($_POST('register'))){
    if(strlen($_POST['name']) >= 1 &&
       strlen($_POST['email']) >= 1 &&
       strlen($_POST['telefono']) >= 1 &&
       strlen($_POST['password']) >= 1)
    {
       $name = trim($_POST['name']);
       $email = trim($_POST['email']);
       $telefono = trim($_POST['telefono']);
       $password = trim($_POST['password']);
       $consulta= "INSERT INTO Usuario(name, email, telefono, password)
                   VALUES('$name', '$email', '$telefono', '$password')";
       $resultado= mysqli_connect($conex, $consulta);
       if($resultado)
       {
        ?>    
        <h3> Registro exitoso </h3>
        <?php
       }else{
        ?>    
        <h3> Completa todos los espacios del formulario </h3>
        <?php
       }
    }
}
?>