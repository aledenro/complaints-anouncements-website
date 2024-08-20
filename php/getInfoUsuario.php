<?php

include "dbConnection.php";

function getInfoUsuario($id_usuario)
{
    $conn = openConnection();
    $sql = "CALL get_usuario_by_id(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute() or die("Error al obtener esta denuncia");
    $result = $stmt->get_result();
    $denuncia = $result->fetch_assoc();

    $stmt->close();
    $conn->close();

    return $denuncia;
}

$id = (int)$_GET['id_usuario'];

$usuario = getInfoUsuario($id);
echo json_encode($usuario);
exit;
