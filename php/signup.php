<?php
include "dbConnection.php";

header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8");

function createUser($conn, $nombre, $apellidos, $correo, $numero, $contrasena){
   $sql = "CALL create_usuario (?, ?, ?, ?, ?)";

   if ($stmtCreate = mysqli_prepare($conn, $sql)) {
      $hash_contrasena = password_hash($contrasena, PASSWORD_DEFAULT);
      mysqli_stmt_bind_param($stmtCreate, 'sssss', $nombre, $apellidos, $correo, $numero, $hash_contrasena);

      if (mysqli_stmt_execute($stmtCreate)) {
         echo json_encode(array('success' => true, 'message' => 'Usuario creado.'));
         exit;
      }else{
         echo json_encode(array('success' => false, 'message' => 'Error al crear el usuario.'));
         exit;
      }
   } else{
      echo json_encode(array('success' => false, 'message' => 'Error al crear el usuario.'));
      exit;
   }
}

function signup($nombre, $apellidos, $correo, $numero, $contrasena){
    
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
            mysqli_stmt_close($stmt);

            // verifica si el array no esta vacio
            if($user){
               echo json_encode(array('success' => true, 'message' => 'Ya existe un usuario con ese correo.'));
               exit;
            }else{
               createUser($conn, $nombre, $apellidos, $correo, $numero, $contrasena);
            }
            
        } else {
            echo json_encode(array('success' => false, 'message' => 'Error al verificar si existe el usuario.'));
            exit;
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error al verificar si existe el usuario.'));
        exit;
    }

    mysqli_close($conn);
}

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data["nombre"];
$apellidos = $data["apellidos"];
$correo = $data["correo"];
$numero = $data["numero"];
$contrasena = $data["contrasena"];


signup($nombre, $apellidos, $correo, $numero, $contrasena);
?>