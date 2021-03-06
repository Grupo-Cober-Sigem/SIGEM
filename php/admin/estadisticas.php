<?php
include_once '../conexion.php';

$conexion = new Conexion();
$cn = $conexion->Conectar();

//Recepcion de parámetros mediante axios
$_POST = json_decode(file_get_contents("php://input"), true);

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

switch($opcion){
    case 1: //Aprobado
        $consultaaprobado = "SELECT count(Estado) as prueba FROM Seguimiento WHERE Estado='Aprobado'";
        $resultado = $cn->prepare($consultaaprobado);
        $resultado->execute();
        $data = $resultado->fetch(PDO::FETCH_ASSOC);
        $dato = $data["prueba"];
        //echo $dato;
        break;

    case 2: //Pendiente
        $consultapendiente = "SELECT count(Estado) as prueba FROM Seguimiento WHERE Estado='Pendiente'";
        $resultado = $cn->prepare($consultapendiente);
        $resultado->execute();
        $data = $resultado->fetch(PDO::FETCH_ASSOC);
        $dato = $data["prueba"];
        //echo $dato;
        break;

    case 3: //Rechazar
        $consultarechazado = "SELECT count(Estado) as prueba FROM Seguimiento WHERE Estado='Rechazado'";
        $resultado = $cn->prepare($consultarechazado);
        $resultado->execute();
        $data = $resultado->fetch(PDO::FETCH_ASSOC);
        //$row = mysqli_fetch_array($resultado, MYSQLI_ASSOC);
        $dato = $data["prueba"];
        //echo $dato;
        break;
    };



// Enviar el array final en formato JSON a Javascript
print json_encode($dato);
// Cerramos la conexión
$conexion = NULL;
?>
