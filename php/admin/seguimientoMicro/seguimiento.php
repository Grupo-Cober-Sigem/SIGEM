<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
    $unidad = (isset($_POST['unidad'])) ? $_POST['unidad'] : '';
    $subtema = (isset($_POST['subtema'])) ? $_POST['subtema'] : '';

    switch($opcion){
        case 1: //Listar
            $consulta = "SELECT Cod_Segui, Cod_Asignatura, Cod_User, Horario_Segui, Dia_Segui, Cod_Unidad, Cod_Subte, Actividad_Segui, estrategiaTeams, estrategiaElibre, estrategiaOtro, materialGuias, materialWord, materialDiapositiva, materialVideo, materialOtro, actSincronica_Segui, Participantes_Segui, Observa_Segui, Soporte, Estado, jefeObserva_Segui FROM Seguimiento";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
            
        case 2: //Listar Asignaturas
            $consulta = "SELECT Cod_Asignatura, Nombre_Asig FROM Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            echo $data

        case 3: //Listar Unidades de la asignatura
            $consulta = "SELECT * FROM Unidades LEFT OUTER JOIN Microcurriculo ON Unidades.Cod_Micro = Microcurriculo.Cod_Micro INNER JOIN Asignatura WHERE Microcurriculo.Cod_Asignatura = Asignatura.Cod_Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        
        case 4: //Listar subtemas de la asignatura
            $consulta = "SELECT Cod_Subte, Nombre_Subte FROM Subtemas LEFT OUTER JOIN Unidades WHERE Subtemas.Cod_Unidad = Unidades.Cod_Unidad";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    };
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>