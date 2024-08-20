<?php
include "dbConnection.php";

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

session_start();

function insert_denuncia($usuario, $isAnonimo, $titulo, $estado, $descripcion, $provincia, $canton, $distrito, $categoria, $url)
{

    $conn = openConnection();

    $sql = "CALL insert_denuncia (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iisisssiiii', $usuario, $isAnonimo, $titulo, $estado, $fecha, $descripcion, $url, $provincia, $canton, $distrito, $categoria);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            $sql = "CALL get_id_latest_denuncia";
            $result = $conn->query($sql) or die("Error al extraer la denuncia: " . $conn->error);
            $row = $result->fetch_assoc();
            return $row = $row["id_denuncia"];
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
$isAnonimo = (int) $data["isAnonimo"];
$categoria = (int) $data["categoria"];
$provincia = (int) $data["provincia"];
$canton = (int) $data["canton"];
$distrito = (int) $data["distrito"];
$descripcion = $data["descripcion"];
$estado = 0;
$id_usuario = (int) $_SESSION["id_Usuario"];
$url = "";

$denuncia = insert_denuncia($id_usuario, $isAnonimo, $titulo,  $estado, $descripcion,  $provincia, $canton, $distrito, $categoria, $url);

echo $denuncia;
exit;
