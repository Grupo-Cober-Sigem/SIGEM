<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
    $nombres = (isset($_POST['nombres'])) ? $_POST['nombres'] : '';
    $apellidos = (isset($_POST['apellidos'])) ? $_POST['apellidos'] : '';
    $correo = (isset($_POST['correo'])) ? $_POST['correo'] : '';
    $rol= (isset($_POST['rol'])) ? $_POST['rol'] : '';

    
?>