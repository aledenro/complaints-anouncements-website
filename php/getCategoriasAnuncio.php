<?php
include "dbConnection.php";

function getCategoriasAnuncio()
{
    $conn = openConnection();
    $sql = "CALL get_categoria_anuncio";
    $result = $conn->query($sql) or die("Error al consultar las categorias: " . $conn->error);

    $categorias = array();

    while ($row = $result->fetch_assoc()) {
        array_push($categorias, $row);
    }

    $conn->close();

    return $categorias;
}

$categorias = getCategoriasAnuncio();
echo json_encode(array("Categorias" => $categorias));
exit;
