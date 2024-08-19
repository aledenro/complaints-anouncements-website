<?php
include "dbConnection.php";

$id = (int) $_GET['id'];
$estado = (int) $_GET['estado'];

if($estado === 0){
    $estado = 1;
}else{
    $estado = 0;
}


$conn = openConnection();
$sql = "CALL update_estado_anuncio (?,?)";

if ($stmt = mysqli_prepare($conn, $sql)) {
    // vincular los parametros
    mysqli_stmt_bind_param($stmt, 'ii', $id , $estado);

    // ejecutar consulta
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(array('success' => true));
        exit;
    } else {
        echo json_encode(array('success' => false, 'message' => 'ERROR: No se pudo cambiar el estado del anuncio'));
        exit;
    }

    mysqli_stmt_close($stmt);
} else {
    echo json_encode(array('success' => false, 'message' => 'ERROR: No se pudo cambiar el estado del anuncio'));
}

mysqli_close($conn);
