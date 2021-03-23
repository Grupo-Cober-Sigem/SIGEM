<?php

include_once 'cors.php';
include_once 'conexion.php';

// Realizamos la conexión a la base de datos
$conexion = new Conexion();
$cn = $conexion->Conectar();

// Necesario para recibir parametros por Axios
$_POST = json_decode(file_get_contents("php://input"), true);

// Recepción de los datos enviados mediante POST desde main.js
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

$id = (isset($_POST['id'])) ? $_POST['id'] : '';
$marca = (isset($_POST['marca'])) ? $_POST['marca'] : '';
$modelo = (isset($_POST['modelo'])) ? $_POST['modelo'] : '';
$stock = (isset($_POST['stock'])) ? $_POST['stock'] : '';

$Cod_User = (isset($_POST['Cod_User'])) ? $_POST['Cod_User'] : '';
$Pass = (isset($_POST['Pass'])) ? $_POST['Pass'] : '';

switch($opcion){
    // Subir datos (CREATE)
    case 1:
        $consulta = "INSERT INTO moviles (marca, modelo, stock) VALUES ('$marca','$modelo','$stock')";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        break;
    // Modificar datos (UPDATE)
    case 2:
        $consulta = "UPDATE moviles SET marca='$marca', modelo='$modelo', stock='$stock' WHERE id='$id' ";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    // Eliminar datos (DELETE)
    case 3:
        $consulta = "DELETE FROM moviles WHERE id='$id' ";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        break;
    // Mostrar datos (READ)
    case 4:
        $consulta = "SELECT id, marca, modelo, stock FROM moviles";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 5:
        $consulta = "SELECT Cod_User, Nombres, Apellidos, email FROM datosusuario WHERE Cod_User='$Cod_User' and Pass='$Pass'";
        $resultado = $cn->prepare($consulta);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

// Enviar el array final en formato JSON a Javascript
print json_encode($data, JSON_UNESCAPED_UNICODE);
// Cerramos la conexión
$conexion = NULL;