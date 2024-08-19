<?php
include "dbConnection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $anuncio = isset($_POST['id_anuncio']) ? $_POST['id_anuncio'] : null;

    if (!$anuncio) {
        echo json_encode(array('success' => false, 'message' => 'ID de anuncio no proporcionado.'));
        exit();
    }
    $usuario = (int) $_SESSION["id_Usuario"];
    $fecha = date('Y-m-d');
    $texto = isset($_POST['comentario']) ? $_POST['comentario'] : '';

    $conn = openConnection();
    $sql = "CALL insert_comentario_anuncio (?,?,?,?)";

    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iiss', $anuncio, $usuario, $fecha, $texto);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(array('success' => true, 'message' => 'Comentario agregado'));
            exit();
        } else {
            echo json_encode(array('success' => false, 'message' => 'ERROR: No se pudo ejecutar la acción'));
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array('success' => false, 'message' => 'ERROR: No se pudo preparar la solicitud ' . mysqli_error($conn)));
    }

    mysqli_close($conn);
}
