<?php

include_once '../conexion.php';

// Realizamos la conexión a la base de datos
$conexion = new Conexion();
$cn = $conexion->Conectar();

// Necesario para recibir parametros por Axios
$_POST = json_decode(file_get_contents("php://input"), true);

// Recepción de los datos enviados mediante POST desde main.js
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$nombres = (isset($_POST['nombres'])) ? $_POST['nombres'] : '';
$apellidos = (isset($_POST['apellidos'])) ? $_POST['apellidos'] : '';
$correo = (isset($_POST['correo'])) ? $_POST['correo'] : '';

switch($opcion){
    case 1:
        $consulta = "SELECT Nombres, Apellidos, email FROM datosUsuario WHERE Cod_User='$usuario'";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2:
        $consulta = "UPDATE datosUsuario SET Nombres='$nombres', Apellidos='$apellidos', email='$correo' WHERE Cod_User='$usuario' ";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

// Enviar el array final en formato JSON a Javascript
print json_encode($data, JSON_UNESCAPED_UNICODE);
// Cerramos la conexión
$conexion = NULL;