<?php
    include_once '../../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
    $codigo = (isset($_POST['codigo'])) ? $_POST['codigo'] : '';
    $creditos = (isset($_POST['creditos'])) ? $_POST['creditos'] : '';
    $area = (isset($_POST['area'])) ? $_POST['area'] : '';
    $ubicacion = (isset($_POST['ubicacion'])) ? $_POST['ubicacion'] : '';
    $nivel= (isset($_POST['nivel'])) ? $_POST['nivel'] : '';
    $modalidad= (isset($_POST['modalidad'])) ? $_POST['modalidad'] : '';
    $caracter= (isset($_POST['caracter'])) ? $_POST['caracter'] : ''; 
    $tipo= (isset($_POST['tipo'])) ? $_POST['tipo'] : '';
    $horaPresencial= (isset($_POST['horaPresencial'])) ? $_POST['horaPresencial'] : '';
    $horaIndependiente= (isset($_POST['horaIndependiente'])) ? $_POST['horaIndependiente'] : '';

    switch($opcion){
        case 1: //Seleccionar
            $consulta = "SELECT Asignatura.Nombre_Asig, Asignatura.Cod_Asignatura, Asignatura.Creditos_Micro, Asignatura.Cod_Area, Asignatura.Ubicacion_Asig, Asignatura.wPresen_Asig, Asignatura.wIndepe_Asig, Microcurriculo.Nivel_Micro, Microcurriculo.Mod_Micro, Microcurriculo.Carac_Micro, Microcurriculo.tipoAsig_Micro  FROM Asignatura INNER JOIN Microcurriculo WHERE Asignatura.Cod_Asignatura = Microcurriculo.Cod_Asignatura";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE Asignatura SET Nombre_Asig='$nombre', Creditos_Micro='$creditos', Cod_Area='$area', Ubicacion_Asig='$ubicacion', wPresen_Asig='$horaPresencial', wIndepe_Asig='$horaIndependiente' WHERE Cod_Asignatura='$codigo' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            
            $consulta = "UPDATE Microcurriculo SET Nivel_Micro='$nivel', Mod_Micro='$modalidad', Carac_Micro='$caracter', tipoAsig_Micro='$tipo' WHERE Cod_Asignatura='$codigo' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>