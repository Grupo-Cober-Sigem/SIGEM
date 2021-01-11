<?php
    /*function conexion(){*/
        $servidor="51.79.81.50";
        $usuario="grupocob_andrefe";
        $bd="grupocob_sigem";
        $password="Th3Unkindled";

        $conexion=mysqli_connect($servidor,$usuario,$password,$bd);

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
