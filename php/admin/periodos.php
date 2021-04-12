<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $periodo = (isset($_POST['periodo'])) ? $_POST['periodo'] : '';
    $fechaIni = (isset($_POST['fechaIni'])) ? $_POST['fechaIni'] : '';
    $fechaFin = (isset($_POST['fechaFin'])) ? $_POST['fechaFin'] : '';

    switch($opcion){
        case 1: //Seleccionar
            $consulta = "SELECT idPeriodo, fechaIni, fechaFin FROM periodoAcademico";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE periodoAcademico SET fechaIni='$fechaIni', fechaFin='$fechaFin' WHERE idPeriodo='$periodo' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3: // Eliminar
            $consulta = "DELETE FROM datosUsuario WHERE Cod_User='$usuario' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 4: // Agregar
            $consulta = "INSERT INTO periodoAcademico (idPeriodo, fechaIni, fechaFin) VALUES ('$periodo','$fechaIni','$fechaFin')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;

?>