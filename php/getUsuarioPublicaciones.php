<?php
include "dbConnection.php";
/**
 * @param int $id_usuario.
 * @return array denuncias.
 */
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

function getAnunciosUsuario($id_usuario)
{
    $conn = openConnection();
    $sql = "CALL get_anuncios_usuario(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute() or die("Error al obtener anuncios de este usuario");
    $result = $stmt->get_result();

    $anuncios = array();
    while ($row = $result->fetch_assoc()) {
        $anuncios[] = $row;
    }

    $stmt->close();
    $conn->close();

    return $anuncios;
}

function getDenunciasUsuario($id_usuario)
{
    $conn = openConnection();
    $sql = "CALL get_denuncias_usuario(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute() or die("Error al obtener denuncias de este usuario");
    $result = $stmt->get_result();

    $denuncias = array();
    while ($row = $result->fetch_assoc()) {
        $denuncias[] = $row;
    }

    $stmt->close();
    $conn->close();

    return $denuncias;
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'getDenuncias':
            if (isset($_GET['id_usuario'])) {
                $denuncias = getDenunciasUsuario($_GET['id_usuario']);
                echo json_encode(['Denuncias' => $denuncias]);
            } else {
                echo json_encode(['error' => 'id de usuario no proporcionado']);
            }
            break;
        case 'getAnuncios':
            if (isset($_GET['id_usuario'])) {
                $anuncios = getAnunciosUsuario($_GET['id_usuario']);
                echo json_encode(['Anuncios' => $anuncios]);
            } else {
                echo json_encode(['error' => 'id de usuario no proporcionado']);
            }
            break;
        default:
            echo json_encode(['error' => 'Accion invalida']);
            break;
    }
} else {
    echo json_encode(['error' => 'No se especifico accion']);
}

exit;
