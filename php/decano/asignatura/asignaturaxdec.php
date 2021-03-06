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

    echo $nombre;

    switch($opcion){
        case 1: //Seleccionar Programa para filtro
            $consulta = "SELECT * FROM Programa";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Seleccionar Area para filtro
            $consulta = "SELECT Cod_Area, Nombre_Area FROM Area";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3: // Seleccionar Usuarios para filtro
            $consulta = "SELECT Cod_User, Nombres, Apellidos FROM datosUsuario WHERE habilitado='1' AND rol NOT LIKE CONCAT('%','5','%')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 4: // Agregar Asignatura
            $consulta = "INSERT INTO Asignatura (Cod_Asignatura, Nombre_Asig, Cod_Area, ubicacion_Asig) VALUES ('$codigo','$nombre','$area','$nivelFormacion')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();

            $consulta = "INSERT INTO Microcurriculo (Cod_Micro, Cod_Asignatura) VALUES ('null','$codigo')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();

            $consulta = "INSERT INTO planAula (Cod_Plan, Cod_Asignatura) VALUES ('null','$codigo')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 5: //Filtrar
            $consulta = "SELECT Cod_Asignatura, Nombre_Asig, Ubicacion_Asig, Cod_Area, Cod_User FROM Asignatura WHERE ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        case 6: //Listar Asignaturas
            $consulta = "SELECT Cod_Asignatura, Nombre_Asig, Ubicacion_Asig, Cod_Area, Cod_User FROM Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>
