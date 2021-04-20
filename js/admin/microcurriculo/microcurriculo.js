var url = "";
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
                html:'<div class="form-group"><label for="exampleFormControlInput1">Nombre</label><input type="text" class="form-control" placeholder="Nombre de la asignatura" id="nombre" value="'+nombre+'"></div><div class="form-group"><div class="row"><div class="col"><label for="exampleFormControlInput1">Código</label><input type="text" class="form-control" placeholder="Código de la asignatura" id="codigo" value="'+codigo+'"></div><div class="col"><label for="exampleFormControlInput1">Nro. de Creditos</label><input type="text" class="form-control" placeholder="Cantidad de Creditos" id="creditos" value="'+creditos+'"></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Área</label><select class="form-control" id="area"><option value="1">Básicas de Ingeniería</option><option value="2">Ingeniería Aplicada</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Ubicación</label><select class="form-control" id="nivel"><option value="1">Semestre 1</option><option value="2">Semestre 2</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Nivel de formación</label><select class="form-control" id="nivel"><option value="1">Pregado</option><option value="2">Posgrado</option><option value="3">Tecnología</option><option value="4">Técnico</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Modalidad</label><select class="form-control" id="modalidad"><option value="1">Presencial</option><option value="2">A distancia</option><option value="3">Tutoriada</option><option value="4">Virtual</option><option value="5">Escenarios múltiples</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Carácter</label><select class="form-control" id="caracter"><option value="1">Obligatoria</option><option value="2">Electiva</option><option value="3">Optativa</option></select></div></div><div class="col"><div class="form-group"><label for="exampleFormControlSelect1">Tipo de asignatura</label><select class="form-control" id="tipo"><option value="1">Teórica</option><option value="2">Práctica</option><option value="3">Teórica Práctica</option></select></div></div></div><div class="row"><div class="col"><div class="form-group"><label for="exampleFormControlInput1">Número de horas Semanales</label><div class="row"><div class="col"><input type="text" class="form-control" placeholder="Presenciales" id="horaPresencial" value="'+horaPresencial+'"></div><div class="col"><input type="text" class="form-control" placeholder="Independientes" id="horaIndependiente" value="'+horaIndependiente+'"></div></div></div></div></div>',
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

        //Procedimientos
        listarMicrocurriculo: function(){
            axios.post(url,{opcion:1}).then(response=>{
                this.datosMicrocurriculo = response.data;
                console.log(this.datos);
            });
        }
    },
    created:function(){
        this.listarMicrocurriculo();
    }
});                                 