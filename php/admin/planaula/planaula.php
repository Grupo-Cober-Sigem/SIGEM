<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
    $preRequisitos = (isset($_POST['preRequisitos'])) ? $_POST['preRequisitos'] : '';
    $periodo = (isset($_POST['periodo'])) ? $_POST['periodo'] : '';
    $bloque = (isset($_POST['bloque'])) ? $_POST['bloque'] : '';
    $aula = (isset($_POST['aula'])) ? $_POST['aula'] : '';

    switch($opcion){
        case 1: //Seleccionar
            $consulta = "SELECT Asignatura.Nombre_Asig, Asignatura.Cod_Asignatura, Asignatura.Ubicacion_Asig FROM Asignatura INNER JOIN planAula WHERE Asignatura.Cod_Asignatura = planAula.Cod_Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE planAula SET preRequisitos_Plan='$preRequisitos', Bloque_Plan='$bloque', Aula_Plan='$aula', ano_Plan='$periodo' WHERE Cod_Asignatura='$codigo' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 3: //Filtrar
            $consulta = "SELECT Asignatura.Nombre_Asig, Asignatura.Cod_Asignatura, Asignatura.Ubicacion_Asig FROM Asignatura INNER JOIN planAula WHERE Asignatura.Cod_Asignatura = planAula.Cod_Asignatura AND Asignatura.Nombre_Asig LIKE CONCAT('%','$codigo','%')";
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