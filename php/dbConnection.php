<?php
function openConnection(){
    //abre conexion a la bd y retorna la misma
    $dbhost = 'localhost'; 
    $dbuser = 'usuario_proyecto'; 
    $dbpass = '12345.';
    $dbname = 'denunciasCiudadanas';

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname) or die("Error al conectarse a la BD: ".  $conn->error);

    return  $conn;
}
?>