<?php
    /*function conexion(){*/
        $servidor="host25.latinoamericahosting.com";
        $usuario="grupocob_andrefe";
        $bd="grupocob_sigem";
        $password="Th3Unkindled";

        $conexion=mysqli_connect($servidor,$usuario,$password,$bd);

        $this->$conexion->set_charset("utf8");

        if($conexion)
        {
            echo "Conectado a la BD";
        }
        else
        {
            echo "No se pudo conectar";
        }

        if (mysqli_connect_errno()) {
            print("error al conectarse");
        }
    /*}*/

?>
