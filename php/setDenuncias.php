<?php
include "dbConnection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $isAnonimo = isset($_POST['switchAnonimo']) ? $_POST['switchAnonimo'] : 0;
    $usuario = 1;
    $estado = 1;

    function getPostValue($key, $default = '')
    {
        return isset($_POST[$key]) ? htmlspecialchars(trim($_POST[$key])) : $default;
    }

    $titulo = getPostValue('tituloDenuncia');
    $provincia = getPostValue('selectProvincia');
    $canton = getPostValue('selectCanton');
    $distrito = getPostValue('selectDistrito');
    $descripcion = getPostValue('descripcion');
    $fecha = date('Y-m-d');
    $url = getPostValue('imgDenuncia');
    $categoria = 1;

    $conn = openConnection();

    $sql = "CALL insert_denuncia (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iisisssiiii', $usuario, $isAnonimo, $titulo, $estado, $fecha, $descripcion, $url, $provincia, $canton, $distrito, $categoria);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            echo "Denuncia agregadada a la base de datos";
        } else {
            echo "ERROR: No se pudo ejecutar la solicitud " . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "ERROR: No se pudo preparar la solicitud " . mysqli_error($conn);
    }

    mysqli_close($conn);
}
