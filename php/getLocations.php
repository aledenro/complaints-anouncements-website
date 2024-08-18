<?php
include "dbConnection.php";


function getProvincias()
{
    $conn = openConnection();
    $sql = "CALL get_provincias";
    $result = $conn->query($sql) or die(json_encode(['error' => "Error al consultar las provincias: " . $conn->error]));

    $provincias = array();

    while ($row = $result->fetch_assoc()) {
        array_push($provincias, $row);
    }

    $conn->close();

    return $provincias;
}

function getCantones($id_provincia)
{
    $conn = openConnection();

    $sql = "CALL get_cantones(?)";
    $stmt = $conn->prepare($sql) or die(json_encode(['error' => "Error al consultar cantones: " . $conn->error]));

    $stmt->bind_param("i", $id_provincia);
    $stmt->execute();
    $result = $stmt->get_result();

    $cantones = array();
    while ($row = $result->fetch_assoc()) {
        array_push($cantones, $row);
    }

    $conn->close();

    return $cantones;
}

function getDistritos($id_canton)
{
    $conn = openConnection();
    $sql = "CALL get_distritos(?)";
    $stmt = $conn->prepare($sql) or die(json_encode(['error' => "Error al consultar distritos: " . $conn->error]));
    $stmt->bind_param("i", $id_canton);
    $stmt->execute();
    $result = $stmt->get_result();

    $distritos = array();
    while ($row = $result->fetch_assoc()) {
        array_push($distritos, $row);
    }

    $conn->close();

    return $distritos;
}

header('Content-Type: application/json');

// envia informacion segun lo que recibe desde js
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
            // si la accion recibida es 
        case 'get_provincias':
            echo json_encode(getProvincias());
            break;
            // si la accion recibida es get cantones, se recibe el id de la provincia
        case 'get_cantones':
            // error_log('data recibida: ' . print_r($_GET, true)); 
            if (isset($_GET['id'])) {
                echo json_encode(getCantones($_GET['id']));
            } else {
                echo json_encode(['error' => 'ID de provincia no proporcionado']);
            }
            break;
            // si la accion recibida es get distritos, se recibe el id de la provincia
        case 'get_distritos':
            if (isset($_GET['id'])) {
                echo json_encode(getDistritos($_GET['id']));
            } else {
                echo json_encode(['error' => 'ID de cantón no proporcionado']);
            }
            break;
        default:
            echo json_encode(['error' => 'Acción invalida']);
            break;
    }
} else {
    echo json_encode(['error' => 'No se ha especificado ninguna accion']);
}
