<?php
include "dbConnection.php";

function get_all_denuncias()
{
    $conn = openConnection();
    $sql = "CALL get_all_denuncias";
    $result = $conn->query($sql) or die("Error al extraer las denuncias: " . $conn->error);

    $denuncias = array();

    while ($row = $result->fetch_assoc()) {
        array_push($denuncias, $row);
    }

    $conn->close();

    return $denuncias;
}

$denuncias = get_all_denuncias();
echo json_encode(array("Denuncias" => $denuncias));
exit;
