<?php
$username=$_POST['username'];
$password=$_POST['password'];
session_start();
$_SESSION['username']=$username;

$conexion=mysqli_connect("localhost","usuario_proyecto","12345","denunciasCiudadanas")

$consulta="SELECT*FROM Usuario where Nombre='$username' and Contraseña='$password'";
$resultado=mysqli_query($conexion,$consulta);

$filas=mysqli_num_rows($resultado);

if($filas){
    header("location:index.html");
}else{
    ?>
    <?php
    include("login.html");
    ?>
    <h1> El nombre de usuario o contraseña, son incorrectos</h1>
    <?php
}
mysqli_free_result($resultado);
mysql_close($conexion);