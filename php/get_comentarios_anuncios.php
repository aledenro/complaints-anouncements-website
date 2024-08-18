<?php
include "dbConnection.php";

function get_comentarios_anuncios($id_anuncio){
    $conn = openConnection();
    $sql = "CALL get_comentarios_anuncio(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_anuncio);
    $stmt->execute() or die("Error al obtener los comentarios de los anuncios");
    $result = $stmt->get_result();

    $comentarios = array();

    while ($row = $result->fetch_assoc()) {
        array_push($comentarios, $row);
    }

    $conn->close();

    return $comentarios;
}

function get_count_comentarios_anuncios($id_anuncio){
    $conn = openConnection();
    $sql = "CALL get_count_comentarios_anuncio(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_anuncio);
    $stmt->execute() or die("Error al obtener la cantidad de comentarios de los anuncios");
    $result = $stmt->get_result();

    $row = $result->fetch_assoc();
    $countComentarios = $row["cantComentarios"];

    $conn->close();

    return $countComentarios;
}

$id = (integer)$_GET['id_denuncia'];

$comentarios = get_comentarios_anuncios($id);
$cantComentarios = get_count_comentarios_anuncios($id);
echo json_encode(array("countComentarios" => $cantComentarios,"Comentarios" => $comentarios));
exit;
?>