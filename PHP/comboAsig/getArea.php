<?php

require('../conexion.php');

$Cod_programa = $_POST['Cod_programa'];

$queryA = "SELECT Cod_Area, Nombre_Area FROM Area WHERE Cod_programa='$Cod_programa'
ORDER BY Nombre_Area ASC"
$resultadoA = $mysqli->query($queryA);

$html = "<option value='0'>Seleccionar Programa</option>";

WHILE($rowA = $resultadoA->fetch_assoc())
{
    $html = "<option value='".$rowA['Cod_Area']."'>".$rowA['Nombre_Area']."</option>":
}

echo $html;

?>
