<?php
include "dbConnection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $isAnonimo = isset($_POST['switchAnonimo']) ? $_POST['switchAnonimo'] : 0;
    $usuario = 3;
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
    $categoria = getPostValue('selectCategoria');

    //
    if (empty($titulo) || empty($categoria) || empty($provincia) || empty($canton) || empty($distrito) || empty($descripcion)) {
        echo json_encode(array('success' => false, 'message' => 'Debe completar todos los espacios obligatorios'));
        exit();
    }

    $conn = openConnection();

    $sql = "CALL insert_denuncia (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iisisssiiii', $usuario, $isAnonimo, $titulo, $estado, $fecha, $descripcion, $url, $provincia, $canton, $distrito, $categoria);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(array('success' => true, 'message' => 'Su denuncia ha sido enviada'));
            exit();
        } else {
            echo json_encode(array('success' => false, 'message' => 'ERROR: No se pudo ejecutar la solicitud'));
            mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "ERROR: No se pudo preparar la solicitud " . mysqli_error($conn);
    }

    mysqli_close($conn);
}
