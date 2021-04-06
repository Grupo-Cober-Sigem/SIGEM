<?php
    include_once '../conexion.php';

    $conexion = new Conexion();
    $cn = $conexion->Conectar();

    //Recepcion de parámetros mediante axios
    $_POST = json_decode(file_get_contents("php://input"), true);

    $opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

    $usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
    $pass = (isset($_POST['pass'])) ? $_POST['pass'] : '';
    $nombres = (isset($_POST['nombres'])) ? $_POST['nombres'] : '';
    $apellidos = (isset($_POST['apellidos'])) ? $_POST['apellidos'] : '';
    $correo = (isset($_POST['correo'])) ? $_POST['correo'] : '';
    $rol= (isset($_POST['rol'])) ? $_POST['rol'] : '';

    switch($opcion){
        case 1: //Seleccionar
            $consulta = "SELECT Nombres, Apellidos, email, rol FROM datosUsuario";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE datosUsuario SET Nombres='$nombres', Apellidos='$apellidos', email='$correo', rol='$rol' WHERE Cod_User='$usuario' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3: // Eliminar
            $consulta = "DELETE FROM datosUsuario WHERE Cod_User='$usuario' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 4: // Agregar
            $consulta = "INSERT INTO datosUsuario (Cod_User, Pass, Nombres, Apellidos, email, rol) VALUES ('$usuario','$pass','$nombres','$apellidos','$correo','$rol')";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>