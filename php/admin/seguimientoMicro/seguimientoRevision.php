<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';



    switch($opcion){
        case 1: //Listar
            $consulta = "SELECT S.Cod_Segui, S.Horario_Segui, S.Dia_Segui, U.Nombre_Unidad, T.Nombre_Subte, S.Actividad_Segui, S.estrategiaTeams, S.estrategiaElibre, S.estrategiaOtro, S.materialGuias, S.materialWord, S.materialDiapositiva, S.materialVideo, S.materialOtro, S.actSincronica_Segui, S.Participantes_Segui, S.Observa_Segui, S.Soporte FROM Seguimiento S INNER JOIN Unidades U ON S.Cod_Unidad = U.Cod_Unidad INNER JOIN Subtemas T ON S.Cod_Subte = T.Cod_Subte WHERE S.Estado ='Pendiente'";
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