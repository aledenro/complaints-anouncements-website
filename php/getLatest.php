<?php
include "dbConnection.php";

function get3Denuncias()
{
    $conn = openConnection();
    $sql = "CALL get_latest_denuncias";
    $result = $conn->query($sql) or die(json_encode(['error' => "Error al consultar las denuncias: " . $conn->error]));

    $denuncias = array();

    while ($row = $result->fetch_assoc()) {
        array_push($denuncias, $row);
    }

    $conn->close();

    return $denuncias;
}

function get3Anuncios()
{
    $conn = openConnection();
    $sql = "CALL get_latest_anuncios";
    $result = $conn->query($sql) or die(json_encode(['error' => "Error al consultar los anuncios: " . $conn->error]));

    $anuncios = array();

    while ($row = $result->fetch_assoc()) {
        array_push($anuncios, $row);
    }

    $conn->close();

    return $anuncios;
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'getDenuncias':
            $denuncias = get3Denuncias();
            echo json_encode(['Denuncias' => $denuncias]);
            break;
        case 'getAnuncios':
            $anuncios = get3Anuncios();
            echo json_encode(['Anuncios' => $anuncios]);
            break;
        default:
            echo json_encode(['error' => 'Accion invalida']);
            break;
    }
} else {
    echo json_encode(['error' => 'No se especifico accion']);
}

exit;
