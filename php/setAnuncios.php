<?php
include "dbConnection.php";
session_start();

header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8"); 


function insert_anuncio($usuario, $titulo, $estado, $descripcion, $oficial, $provincia, $canton, $distrito, $categoria, $url){
    
    $conn = openConnection();

    $sql = "CALL insert_anuncio (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'isisiiiiis', $usuario, $titulo, $estado, $descripcion, $oficial, $provincia, $canton, $distrito, $categoria, $url);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            $sql = "CALL get_id_latest_anuncio";
            $result = $conn->query($sql) or die("Error al extraer los  anuncios: ". $conn->error);
            $row = $result->fetch_assoc();
            return $row["id_anuncio"];
        } else {
           return "";
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "ERROR: No se pudo preparar la solicitud " . mysqli_error($conn);
    }

    mysqli_close($conn);
}

$data = json_decode(file_get_contents('php://input'), true);

$titulo = $data["titulo"];
$oficial = (int) $data["oficial"];
$categoria = (int) $data["categoria"];
$provincia = (int) $data["provincia"];
$canton = (int) $data["canton"];
$distrito = (int) $data["distrito"];
$descripcion = $data["descripcion"];
$estado = 0;
$id_usuario = (int) $_SESSION["id_Usuario"];
$url = "";

$anuncio = insert_anuncio($id_usuario, $titulo, $estado, $descripcion, $oficial, $provincia, $canton, $distrito, $categoria, $url);

echo $anuncio;
exit;
?>