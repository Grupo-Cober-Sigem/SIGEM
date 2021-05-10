<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $asignatura = (isset($_POST['asignatura'])) ? $_POST['asignatura'] : '';
    $codigoUser = (isset($_POST['codigoUser'])) ? $_POST['codigoUser'] : '';
    $nombreAsig = (isset($_POST['nombreAsig'])) ? $_POST['nombreAsig'] : '';
    $hora = (isset($_POST['hora'])) ? $_POST['hora'] : '';
    $dia = (isset($_POST['dia'])) ? $_POST['dia'] : '';
    $unidad = (isset($_POST['unidad'])) ? $_POST['unidad'] : '';
    $subtema = (isset($_POST['subtema'])) ? $_POST['subtema'] : '';
    $actividad = (isset($_POST['actividad'])) ? $_POST['actividad'] : '';
    $teams = (isset($_POST['teams'])) ? $_POST['teams'] : '';
    $elibre = (isset($_POST['elibre'])) ? $_POST['elibre'] : '';
    $estrategiaOtro = (isset($_POST['estrategiaOtro'])) ? $_POST['estrategiaOtro'] : '';
    $guias = (isset($_POST['guias'])) ? $_POST['guias'] : '';
    $word = (isset($_POST['word'])) ? $_POST['word'] : '';
    $diapositiva = (isset($_POST['diapositiva'])) ? $_POST['diapositiva'] : '';
    $video = (isset($_POST['video'])) ? $_POST['video'] : '';
    $materialOtro = (isset($_POST['materialOtro'])) ? $_POST['guias'] : '';
    $actSincronica = (isset($_POST['actSincronica'])) ? $_POST['actSincronica'] : '';
    $nroEstudiantes = (isset($_POST['nroEstudiantes'])) ? $_POST['nroEstudiantes'] : '';
    $observaciones = (isset($_POST['observaciones'])) ? $_POST['observaciones'] : '';
    $soporte = (isset($_POST['soporte'])) ? $_POST['soporte'] : '';


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

        case 5: //Registrar seguimientos
            $consulta = "INSERT INTO Seguimiento (Cod_Segui, Cod_Asignatura, Cod_User, Nombre_Asig, Horario_Segui, Dia_Segui, Cod_Unidad, Cod_Subte, Actividad_Segui, estrategiaTeams, estrategiaElibre, estrategiaOtro, materialGuias, materialWord, materialDiapositiva, materialVideo, materialOtro, actSincronica_Segui, Participantes_Segui, Observa_Segui, Soporte, Estado, jefeObserva_Segui) VALUES (null, '$asignatura', '$codigoUser', '$nombreAsig', '$hora', '$dia', '$unidad', '$subtema', '$actividad', '$teams', '$elibre', '$estrategiaOtro', '$guias', '$word', '$diapositiva', '$video', '$materialOtro', '$actSincronica', '$nroEstudiantes', '$observaciones', '$soporte', 'pendiente', null)";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;

        case 6: //Editar seguimientos
            $consulta = "UPDATE Seguimiento SET Cod_Asignatura='$', Cod_User='$', Horario_Segui='$', Dia_Segui='$', Cod_Unidad='$', Cod_Subte='$', Actividad_Segui='$', estrategiaTeams='$', estrategiaElibre='$', estrategiaOtro='$', materialGuias='$', materialWord='$', materialDiapositiva='$', materialVideo='$', materialOtro='$', actSincronica_Segui='$', Participantes_Segui='$', Observa_Segui='$', Soporte='$' WHERE Cod_Segui='$' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute(); 
            break;
    };
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>