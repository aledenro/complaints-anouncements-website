<?php
include "dbConnection.php";
header('Content-Type: application/json');

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
    $url = '';
    $categoria = getPostValue('selectCategoria');

    //
    if (empty($titulo) || empty($categoria) || empty($provincia) || empty($canton) || empty($distrito) || empty($descripcion)) {
        echo json_encode(array('success' => false, 'message' => 'Debe completar todos los espacios obligatorios'));
        exit;
    }

    $conn = openConnection();

    $sql = "CALL insert_denuncia (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iisisssiiii', $usuario, $isAnonimo, $titulo, $estado, $fecha, $descripcion, $url, $provincia, $canton, $distrito, $categoria);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            $sql = "CALL get_id_latest_denuncia";
            $result = $conn->query($sql) or die("Error al extraer la denuncia: " . $conn->error);
            $row = $result->fetch_assoc();
            $id_latest_denuncia = $row["id_denuncia"];
            exit(json_encode(array('success' => true, 'message' => 'Su denuncia ha sido enviada', "id_denuncia" => $id_latest_denuncia)));
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
