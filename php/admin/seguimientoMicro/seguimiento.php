<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $usuario = (isset($_POST['cod_user'])) ? $_POST['cod_user'] : '';
    $pass = (isset($_POST['pass'])) ? $_POST['pass'] : '';
    $nombres = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
    $apellidos = (isset($_POST['apellidos'])) ? $_POST['apellidos'] : '';
    $correo = (isset($_POST['email'])) ? $_POST['email'] : '';
    $rol= (isset($_POST['rol'])) ? $_POST['rol'] : '';

    switch($opcion){
        case 1: //Listar
            $consulta = "SELECT Cod_Segui, Cod_Asignatura, Cod_User, Nombre_Asig, Horario_Segui, Dia_Segui, Cod_Unidad, Cod_Subte, Actividad_Segui, estrategiaTeams, estrategiaElibre, estrategiaOtro, materialGuias, materialWord, materialDiapositiva, materialVideos, materialOtro, actSincronica_Segui, Participantes_Segui, Observa_Segui, Soprte, Estado, jefeObserva_Segui FROM Seguimiento";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>