<?php
include "dbConnection.php";

function get_all_anuncios(){
    $conn = openConnection();
    $sql = "CALL get_all_anuncios_listado";
    $result = $conn->query($sql) or die("Error al extraer los  anuncios: ". $conn->error);

    $anuncios = array();

    while ($row = $result->fetch_assoc()) {
        array_push($anuncios, $row);
    }

    $conn->close();

    return $anuncios;
}

$anuncios = get_all_anuncios();
echo json_encode(array("Anuncios" => $anuncios));
exit;

?>