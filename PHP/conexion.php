<?php
    function conexion(){
        $servidor="localhost";
        $usuario="root";
        $bd="pruebas";
        $password="";

        $conexion=mysqli_connect($servidor,$usuario,$password,$bd);

        $this->conexion->set_charset("utf8");

        if (mysqli_connect_errno()) {
            print("error al conectarse");
        }
    }

?>
