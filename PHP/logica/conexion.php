<?php
    function conexion(){
        $servidor="localhost";
        $usuario="grupocob_andrefe";
        $bd="grupocob_SIGEM";
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
    }

?>
