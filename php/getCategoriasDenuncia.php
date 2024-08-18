<?php
include "dbConnection.php";

function getCategoriasDenuncia()
{
    $conn = openConnection();
    $sql = "CALL get_categoria_denuncia";
    $result = $conn->query($sql) or die("Error al consultar las categorias: " . $conn->error);

    $categorias = array();

    while ($row = $result->fetch_assoc()) {
        array_push($categorias, $row);
    }

    $conn->close();

    return $categorias;
}

$categorias = getCategoriasDenuncia();
echo json_encode(array("Categorias" => $categorias));
exit;
