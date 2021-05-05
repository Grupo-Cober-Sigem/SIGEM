<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
    $asignatura = (isset($_POST['asignatura'])) ? $_POST['asignatura'] : '';
    $unidad = (isset($_POST['unidad'])) ? $_POST['unidad'] : '';
    $subtema = (isset($_POST['subtema'])) ? $_POST['subtema'] : '';

    switch($opcion){
        case 1: //Listar
            $consulta = "SELECT S.Cod_Segui, S.Cod_Asignatura, S.Cod_User, S.Horario_Segui, S.Dia_Segui, S.Cod_Unidad, U.Nombre_Unidad, S.Cod_Subte, T.Nombre_Subte, S.Actividad_Segui, S.estrategiaTeams, S.estrategiaElibre, S.estrategiaOtro, S.materialGuias, S.materialWord, S.materialDiapositiva, S.materialVideo, S.materialOtro, S.actSincronica_Segui, S.Participantes_Segui, S.Observa_Segui, S.Soporte, S.Estado, S.jefeObserva_Segui FROM Seguimiento S INNER JOIN Unidades U ON S.Cod_Unidad = U.Cod_Unidad INNER JOIN Subtemas T ON S.Cod_Subte = T.Cod_Subte";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
            
        case 2: //Listar Asignaturas
            $consulta = "SELECT Cod_Asignatura, Nombre_Asig FROM Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;

        case 3: //Listar Unidades de la asignatura
            $consulta = "SELECT * FROM Unidades LEFT OUTER JOIN Microcurriculo ON Unidades.Cod_Micro = Microcurriculo.Cod_Micro INNER JOIN Asignatura WHERE Microcurriculo.Cod_Asignatura ='$asignatura' AND Microcurriculo.Cod_Asignatura = Asignatura.Cod_Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        
        case 4: //Listar subtemas de la unidad
            $consulta = "SELECT Cod_Subte, Nombre_Subte FROM Subtemas LEFT OUTER JOIN Unidades ON Subtemas.Cod_Unidad = Unidades.Cod_Unidad WHERE Subtemas.Cod_Unidad='$unidad'";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
    };
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>