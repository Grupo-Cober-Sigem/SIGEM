<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    switch($opcion){
        case 1: //Aprobado
            $consultaaprobado = "SELECT count(Estado) as prueba FROM Seguimiento WHERE Estado='aprobado'";
            $resultado1 = $cn->prepare($consultaaprobado);
            $resultado1->execute();
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            break;

        case 2: //Pendiente
            $consultapendiente = "SELECT count(Estado) FROM Seguimiento WHERE Estado='pendiente'";
            $resultado2 = $cn->prepare($consultapendiente);
            $resultado2->execute();
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            break;

        case 3: //Rechazar
            $consultarechazado = "SELECT count(Estado) FROM Seguimiento WHERE Estado='rehazado'";
            $resultado3 = $cn->prepare($consultarechazado);
            $resultado3->execute();
            break;
    };

    $final = $resultado1.$resultado2.$resultado3;
    echo $final;
    $sentencia = $final->fetch(PDO::FETCH_ASSOC);
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>
