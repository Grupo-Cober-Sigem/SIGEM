<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    switch($opcion){
        case 1: //Aprobado
            $consultaaprobado = "SELECT count(Estado) FROM Seguimiento WHERE Estado='aprobado'";
            $resultado = $cn->prepare($consultaaprobado);
            $resultado->execute();
            $data = $resultado->fetchall(PDO::FETCH_ORI_ABS);
            echo $data;
            break;

        case 2: //Pendiente
            $consultapendiente = "SELECT count(Estado) FROM Seguimiento WHERE Estado='pendiente'";
            $resultado = $cn->prepare($consultapendiente);
            $resultado->execute();
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            echo $data;
            break;

        case 3: //Rechazar
            $consultarechazado = "SELECT count(Estado) FROM Seguimiento WHERE Estado='rechazado'";
            $resultado = $cn->prepare($consultarechazado);
            $resultado->execute();
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            echo $data;
            break;
    };

    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>
