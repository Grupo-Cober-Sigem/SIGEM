<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $periodoAnterior = (isset($_POST['periodoAnterior'])) ? $_POST['periodoAnterior'] : '';
    $periodoActual = (isset($_POST['periodoActual'])) ? $_POST['periodoActual'] : '';
    $fechaIni = (isset($_POST['fechaIni'])) ? $_POST['fechaIni'] : '';
    $fechaFin = (isset($_POST['fechaFin'])) ? $_POST['fechaFin'] : '';
    $activo = (isset($_POST['activo'])) ? $_POST['activo'] : '';

    switch($opcion){
        case 1: //Seleccionar
            $consulta = "SELECT idPeriodo, fechaIni, fechaFin, activo FROM periodoAcademico";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE periodoAcademico SET idPeriodo='$periodoActual' fechaIni='$fechaIni', fechaFin='$fechaFin' WHERE idPeriodo='$periodoAnterior' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3: // Cerrar periodo
            $consulta = "UPDATE periodoAcademico SET periodoActivo='$activo' WHERE idPeriodo='$periodoActual' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 4: // Agregar
            $consulta = "INSERT INTO periodoAcademico (idPeriodo, fechaIni, fechaFin, activo) VALUES ('$periodo','$fechaIni','$fechaFin','1')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 5: //Filtrar
            $consulta = "";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;

?>