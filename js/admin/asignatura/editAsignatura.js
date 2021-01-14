/*
    Los formularios que necesitan fragmentos aparte son:
    + Contenido temático 

    ~ Unidad Temática- Hay que gestionar localmente el contenido.
    ~ Temas a tratar - Hay que gestionar localmente el conteido. 
    ~ Contenido Temático ~ Hay que gestionar localmente el conteido.
    ~ Bibliografía básica
        ~ Bibliografía publicaciones seriadas
        ~ Bibliofratía de sitios web
        ~ Bibliografía complementaria
    ~ Criterios de evaluación
        ~ Periodos de corte académico
        ~ Tipo de actividad
*/

//Contadores 

var numFilaUnidadTematica=0;

$(document).ready(function(){
    
    //CONTENIDO TEMÁTICO
    $('btnUnidadTematicaTxt').on("click",function() //Agregar filas para la tabla de unidad académica.
    {
        var contenido=document.getElementById("nomUnidadTematicaTxt").value;

        var filaUnidad="<tr id='filaUnidad"+numFilaUnidadTematica+"' class='d-flex'>";
                filaUnidad+="<td class='col-1'><span>";
                    filaUnidad+="<input type='tex' class='form-control' id='nomUnidadTematicaTxt'>";
                filaUnidad+="</span></td>";

                filaUnidad+="<td class='col-7'><span>"+contenido+"</span></td>";
                filaUnidad+="<td onclick='editarFilaUnidad' class='col-2'><span><button type='button' class='btn btn-warning'><i class='fa fa-edit'> </i></button></span></td>";
                filaUnidad+="<td onclick='eliminarFilaUnidad' class='col-2'><span><button type='button' class='btn btn-danger'><i class='fa fa-trash'> </i></button></span></td>";

        document.getElementById("tbodyContenidoTematico").insertAdjacentHTML("beforeend",filaUnidad);
    });

    function editarFilaUnidad(idFila)
    {

    }

    function eliminarFilaUnidad(idFila)
    {

    }
})