<?php

    class Conexion {
        public static function Conectar(){
            define('servidor', 'localhost');
            define('nombre_db', 'grupocob_sigem');
            define('usuario', 'root');
            define('contraseña','');

            // Conexión a la base de datos por PDO (Más robusto que utilizar mysqli)
            $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');

            try{
                $conexion = new PDO("mysql:host=".servidor."; dbname=".nombre_db, usuario, contraseña, $opciones);
                return $conexion;
            } catch(Exception $e) {
                die("El error de conexión es: " .$e->getMessage());
            }
        }
    }