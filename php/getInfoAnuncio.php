<?php
include "dbConnection.php";

function getInfoAnuncio($id_anuncio){
    $conn = openConnection();
    $sql = "CALL get_anuncio(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_anuncio);
    $stmt->execute() or die("Error al obtener el ");
    $result = $stmt->get_result();
    $anuncio = $result->fetch_assoc();

    $stmt->close();
    $conn->close();

    return $anuncio;
}

$id = (integer)$_GET['id_denuncia'];

$anuncio = getInfoAnuncio($id);
echo json_encode($anuncio);
exit;

?>