<?php
include "dbConnection.php";

function getInfoDenuncia($id_denuncia)
{
    $conn = openConnection();
    $sql = "CALL get_denuncia(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_denuncia);
    $stmt->execute() or die("Error al obtener esta denuncia");
    $result = $stmt->get_result();
    $denuncia = $result->fetch_assoc();

    $stmt->close();
    $conn->close();

    return $denuncia;
}

$id = (int)$_GET['id_denuncia'];

$denuncia = getInfoDenuncia($id);
echo json_encode($denuncia);
exit;
