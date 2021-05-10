var url = "../../../php/docente/microcurriculo/microcurriculoxdoc.php";
var appUsuarios = new Vue({
    el: "#seccionMicrocurriculo",
    data: {
        datosMicrocurriculo: [],
        nombre: "",
        codigo: "",
        creditos: "",
        area: "",
        ubicacion: "",
        nivel: "",
        modalidad:"",
        caracter:"",
        tipo:"",
        horaPresencial:0,
        horaIndependiente:0
    },
    methods: {
        btnEditarMicro: async function (nombre,codigo,creditos,area,ubicacion,nivel,modalidad,caracter,tipo,horaPresencial,horaIndependiente) {
            const { value: formValues } = await Swal.fire({
                title: 'Editar',
                html:'<div class="form-group">'+
/*Nombre*/      '<label for="nombre">Nombre</label><input type="text" class="form-control" placeholder="Nombre de la asignatura" id="nombre" value="'+nombre+'" disabled></div>'+
                '<div class="form-group"><div class="row"><div class="col">'+
/*Codigo*/      '<label for="codigo">Código</label><input type="text" class="form-control" placeholder="Código de la asignatura" id="codigo" value="'+codigo+'" disabled></div><div class="col">'+
/*Creditos*/    '<label for="creditos">Nro. de Creditos</label><input type="text" class="form-control" placeholder="Cantidad de Creditos" id="creditos" value="'+creditos+'"></div></div></div>'+
                '<div class="row"><div class="col"><div class="form-group">'+
/*Area*/        '<label for="area">Área</label><select class="form-control" id="area" disabled>'+
                    '<option value="1">Básicas de Ingeniería</option>'+
                    '<option value="2">Ingeniería Aplicada</option></select></div></div><div class="col"><div class="form-group">'+
/*Semestre*/    '<label for="ubicacion">Semestre</label><select class="form-control" id="ubicacion" disabled>'+
                    '<option value="Primer">Primero</option>'+
                    '<option value="Segundo">Segundo</option>'+
                    '<option value="Tercer">Tercero</option>'+
                    '<option value="Cuarto">Cuarto</option>'+
                    '<option value="Quinto">Quinto</option>'+
                    '<option value="Sexto">Sexto</option>'+
                    '<option value="Septimo">Septimo</option>'+
                    '<option value="Octavo">Octavo</option>'+
                    '<option value="Noveno">Noveno</option>'+
                    '<option value="Decimo">Decimo</option></select></div></div></div><div class="row"><div class="col"><div class="form-group">'+
/*Nivel*/       '<label for="nivel">Nivel de formación</label><select class="form-control" id="nivel">'+
                    '<option value="Pregrado">Pregado</option>'+
                    '<option value="Postgrado">Postgrado</option>'+
                    '<option value="Tecnológico">Tecnológico</option>'+
                    '<option value="Técnico">Técnico</option></select></div></div><div class="col"><div class="form-group">'+
/*Modalidad*/   '<label for="modalidad">Modalidad</label><select class="form-control" id="modalidad">'+
                    '<option value="Presencial">Presencial</option>'+
                    '<option value="A distancia">A distancia</option>'+
                    '<option value="Tutoriada">Tutoriada</option>'+
                    '<option value="Virtual">Virtual</option>'+
                    '<option value="Escenarios múltiples">Escenarios múltiples</option></select></div></div></div><div class="row"><div class="col"><div class="form-group">'+
/*Caracter*/    '<label for="caracter">Carácter</label><select class="form-control" id="caracter">'+
                    '<option value="Obligatoria">Obligatoria</option>'+
                    '<option value="Electiva">Electiva</option>'+
                    '<option value="Optativa">Optativa</option></select></div></div><div class="col"><div class="form-group">'+
/*Tipo*/        '<label for="tipo">Tipo de asignatura</label><select class="form-control" id="tipo">'+
                    '<option value="Teórica">Teórica</option>'+
                    '<option value="Práctica">Práctica</option>'+
                    '<option value="Teórica Práctica">Teórica Práctica</option></select></div></div></div>'+
                '<div class="row"><div class="col"><div class="form-group">'+
                '<label for="horaPresencial">Número de horas Semanales</label><div class="row"><div class="col">'+
/*hPresencial*/     '<input type="text" class="form-control" placeholder="Presenciales" id="horaPresencial" value="'+horaPresencial+'"></div><div class="col">'+
/*hIndependiente*/  '<input type="text" class="form-control" placeholder="Independientes" id="horaIndependiente" value="'+horaIndependiente+'"></div></div></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                }).then((result) => {
                    if (result.value) {
                        nombre= Swal.getPopup().querySelector('#nombre').value,
                        codigo= Swal.getPopup().querySelector('#codigo').value,
                        creditos= Swal.getPopup().querySelector('#creditos').value,
                        area= Swal.getPopup().querySelector('#area').value,
                        ubicacion= Swal.getPopup().querySelector('#ubicacion').value,
                        nivel= Swal.getPopup().querySelector('#nivel').value,
                        modalidad= Swal.getPopup().querySelector('#modalidad').value,
                        caracter= Swal.getPopup().querySelector('#caracter').value,
                        tipo= Swal.getPopup().querySelector('#tipo').value,
                        horaPresencial= Swal.getPopup().querySelector('#horaPresencial').value,
                        horaIndependiente= Swal.getPopup().querySelector('#horaIndependiente').value

                        this.editarMicrocurriculo(nombre,codigo,creditos,area,ubicacion,nivel,modalidad,caracter,tipo,horaPresencial,horaIndependiente);
                        Swal.fire(
                            '¡Actualizado!',
                            'El registro ha sido actualizado.',
                            'success'
                        )
                    }
                });
        },
        editarMicrocurriculo: async function (nombre,codigo,creditos,area,ubicacion,nivel,modalidad,caracter,tipo,horaPresencial,horaIndependiente) {
            axios.post(url, {opcion:2, nombre:nombre, codigo:codigo, creditos:creditos, area:area, ubicacion:ubicacion,nivel:nivel,modalidad:modalidad,caracter:caracter, tipo:tipo,horaPresencial:horaPresencial,horaIndependiente:horaIndependiente }).then(response =>{
                this.listarMicrocurriculo();
             });
         },

         btnFiltrarMicro: async function()
        {
            let nombre = document.getElementById("campoBusqueda").value;

            switch(nombre)
            {
                case "":
                    this.listarMicrocurriculo();
                    break;

                case null:
                    this.listarMicrocurriculo();
                    break;

                default:
                    axios.post(url,{opcion:3,nombre:nombre}).then(response=>{
                        this.datosMicrocurriculo = response.data;
                        console.log(this.datosMicrocurriculo);
                        nombre="";
                    });
                    break;
            }
        },

        //Procedimientos
        listarMicrocurriculo: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosMicrocurriculo = response.data;
                console.log(this.datosMicrocurriculo);
            });
        }
    },
    created:function(){
        this.listarMicrocurriculo();
    }
});
