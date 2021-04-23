<?php
    include_once '../conexion.php';

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
        case 1: //Seleccionar
            $consulta = "SELECT Cod_User, Pass, Nombres, Apellidos, email, rol, habilitado FROM datosUsuario";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: //Modificar
            $consulta = "UPDATE datosUsuario SET Pass='$pass', Nombres='$nombres', Apellidos='$apellidos', email='$correo', rol='$rol' WHERE Cod_User='$usuario' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 3: // Deshabilitar
            $d=0;
            $consulta = "UPDATE datosUsuario SET habilitado='$a' WHERE Cod_User='$usuario' ";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 4: // Agregar
            $consulta = "INSERT INTO datosUsuario (Cod_User, Pass, Nombres, Apellidos, email, rol, habilitado) VALUES ('$usuario','$pass','$nombres','$apellidos','$correo','$rol',1)";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            break;
        case 5:
            $consulta = "SELECT Cod_User, Pass, Nombres, Apellidos, email, rol, habilitado FROM datosUsuario WHERE Nombres OR Apellidos LIKE %'$nombres'%";
            $resultado = $cn->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    }
    // Enviar el array final en formato JSON a Javascript
    print json_encode($data, JSON_UNESCAPED_UNICODE);
    // Cerramos la conexión
    $conexion = NULL;
?>