<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
    $codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
    $nivelFormacion = (isset($_POST['nivelFormacion'])) ? $_POST['nivelFormacion'] : '';
    $nroEstudiantes = (isset($_POST['nroEstudiantes'])) ? $_POST['nroEstudiantes'] : '';
    $programa = (isset($_POST['programa'])) ? $_POST['programa'] : '';
    $area = (isset($_POST['area'])) ? $_POST['area'] : '';
    $docente = (isset($_POST['docente'])) ? $_POST['docente'] : '';

    switch($opcion){
        case 1: //Seleccionar Programa para filtro
            $consulta = "SELECT * FROM Programa";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Seleccionar Area para filtro
            $consulta = "SELECT Cod_Area, Nombre_Area FROM Area WHERE Cod_programa='$programa'";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 3: // Seleccionar Usuarios para filtro
            $consulta = "SELECT Cod_User, Nombres, Apellidos FROM datosUsuario WHERE habilitado='1'";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 4: // Agregar Asignatura
            $consulta = "INSERT INTO Asignatura (Cod_Asignatura, Nombre_Asig, Cod_Area, ubicacion_Asig) VALUES ('$usuario','$pass','$nombres','$apellidos','$correo','$rol',1)";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 5: //Filtrar
            $consulta = "" ;
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        case 6: //Listar Asignaturas
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>