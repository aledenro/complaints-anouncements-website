<?php
include "dbConnection.php";

header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8");

function login($correo, $contrasena){
    
    $conn = openConnection();

    $sql = "CALL get_usuario_by_correo (?)";

    // preparar consulta
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // vincular los parametros
        mysqli_stmt_bind_param($stmt, 's', $correo);

        // ejecutar consulta
        if (mysqli_stmt_execute($stmt)) {
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            // verifica si el array no esta vacio
            if($user){
                //boolean para verificar si la contrasena es igual
                $passwordMatch = password_verify($contrasena, $user["contrasena"]); 

                // si la contrasena es igual, inicie sesion
                if($passwordMatch){
                    session_start();
                    $_SESSION["id_Usuario"] = $user["id_Usuario"];
                    $_SESSION["Nombre"] = $user["Nombre"];
                    $_SESSION["Apellidos"] = $user["Apellidos"];
                    $_SESSION["Correo"] = $user["Correo"];
                    $_SESSION["Telefono"] = $user["Nombre"];
                    $_SESSION["rol"] = $user["rol"];

                    echo json_encode(array('success' => true, 'message' => 'Login Exitoso'));
                    exit;
                }else{
                    echo json_encode(array('success' => true, 'message' => 'La contraseña no coincide.'));
                }

            }else{
                echo json_encode(array('success' => true, 'message' => 'El usuario no existe.'));
                exit;
            }
            
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error al hacer login'));
            exit;
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error al hacer login'));
        exit;
    }

    mysqli_close($conn);
}

$data = json_decode(file_get_contents('php://input'), true);

$correo = $data["correo"];
$contrasena = $data["contrasena"];

login($correo, $contrasena);
?>