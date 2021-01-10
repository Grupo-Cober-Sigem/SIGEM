<?php
    require_once 'conexion.php':
    session_start();

    $Usuario = $_POST['Usuario'];
    $Clave = $_POST['Pass'];

    $query= "SELECT * from datosUsuario where Cod_User='$Usuario' and Pass='$Clave'"
    $result=mysqli_query($conexion,$query);
    $response=msqli_fetch_array($result);

    if($response!=null)
    {
        if(($response['Cod_User']==$Usuario) && ($response['Pass']==$Clave))
        {
            $_SESSION['miSesion']=array();
            $_SESSION['miSesion']['nombres']=$response['Nombres'];
            $_SESSION['miSesion']['apellids']=$response['Apellidos'];
            $_SESSION['miSesion']['rol']=$response['rol'];
        }

        echo $_SESSION['miSesion']['rol'];
        
    }else{
        echo 0;
    }
?>