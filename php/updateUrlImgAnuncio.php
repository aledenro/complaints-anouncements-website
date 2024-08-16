<?php
include "dbConnection.php";

header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8"); 


function update_url_img_anuncio($id_anuncio, $url){
    
    $conn = openConnection();

    $sql = "CALL update_img_url (?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'is', $id_anuncio, $url);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            return true;
        } else {
           return false;
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "ERROR: No se pudo preparar la solicitud " . mysqli_error($conn);
    }

    mysqli_close($conn);
}

$data = json_decode(file_get_contents('php://input'), true);

$id_anuncio = (int) $data["id_anuncio"];
$url  = $data["url"];


$actualizado = update_url_img_anuncio($id_anuncio, $url);

echo $actualizado;
exit;
?>