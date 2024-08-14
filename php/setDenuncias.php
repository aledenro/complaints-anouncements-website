<?php
include "dbConnection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // recuperar valores del formulario y asignarlos a variables
    $isAnonimo = isset($_POST['switchAnonimo']) ? 1 : 0;
    $usuario = 1;
    $estado = 1;
    $titulo = isset($_POST['tituloDenuncia']) ? $_POST['tituloDenuncia'] : '';
    $provincia = isset($_POST['selectProvincia']) ? $_POST['selectProvincia'] : '';
    $canton = isset($_POST['selectCanton']) ? $_POST['selectCanton'] : '';
    $distrito = isset($_POST['selectDistrito']) ? $_POST['selectDistrito'] : '';
    $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
    $fecha = date('Y-m-d');
    $url = isset($_POST['imgDenuncia']) ? $_POST['imgDenuncia'] : '';

    $conn = openConnection();

    $sql = "INSERT INTO Denuncia (id_Usuario, Anonimo, Titulo, Estado, Fecha, Descripcion, url_imagen, id_Provincia, id_Canton, id_Distrito) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 'iisisssiii', $usuario, $isAnonimo, $titulo, $estado, $fecha, $descripcion, $url, $provincia, $canton, $distrito);

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
