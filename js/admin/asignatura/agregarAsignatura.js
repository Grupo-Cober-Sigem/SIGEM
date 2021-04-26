var url = "../../../php/admin/asignatura/asignatura.php";
var appAsignatura = new Vue({
    el: "#seccionAsignatura",
    data: {
        //Variables para filtros
        programaSeleccionado:0,
        filtroProgramas:[],
        areaSeleccionada:0,
        filtroAreas:[],
        semestreSeleccionado:0,
        //Variables para registros
        datosAsignatura: [],
        nombre:"",
        codigo:0,
        nivelFormacion:"",
        nroEstudiantes:0,
        programa:0,
        area:0,
        docente:0
    },
    methods: {
        btnAgregarAsignatura: async function () {
            const { value: formValues } = await Swal.fire({
                title: 'Agregar',
                html:'<div class="form-group">' +
/*Nombre*/          '<label for="nombre" class="col-form-label">Nombre</label><input type="text" class="form-control" id="nombre"></div>'+
                    '<div class="row"><div class="col"><div class="form-group">'+
/*Codigo */         '<label for="codigo" class="col-form-label">Código</label><input type="text" class="form-control" id="codigo"></div></div>'+
/*Semestre*/        '<div class="col"><div class="form-group"><label for="nivelFormacion" class="col-form-label">Semestre</label><select class="form-control" id="nivelFormacion">'+
                        '<option value="Primer">Primero</option>'+
                        '<option value="Segundo">Segundo</option>'+
                        '<option value="Tercer">Tercero</option>'+
                        '<option value="Cuarto">Cuarto</option>'+
                        '<option value="Quinto">Quinto</option>'+
                        '<option value="Sexto">Sexto</option>'+
                        '<option value="Septimo">Septimo</option>'+
                        '<option value="Octavo">Octavo</option>'+
                        '<option value="Noveno">Noveno</option>'+
                        '<option value="Decimo">Decimo</option></select></div></div>'+
/*# Estudiantes*/   '<div class="col"><div class="form-group"><label for="nroEstudiantes" class="col-form-label">Nro. Estudiantes</label><input type="text" class="form-control" placeholder="Cantidad" id="nroEstudiantes">'+
                    '</div></div></div><div class="form-group">'+
/*Programa*/        '<label for="programa" class="col-form-label">Programa de la asignatura</label><select class="form-control" id="programa">'+
                        '<option value="1">Nombre del programa</option></select></div><div class="form-group">'+
/*Area*/            '<label for="area" class="col-form-label">Área de la asignatura</label><select class="form-control" id="area">'+
                        '<option value="1">Nombre del área</option></select></div><div class="form-group">'+
/*Docente*/         '<label for="docente" class="col-form-label">Docente</label><select class="form-control" id="docente">'+
                        '<option value="1">Maritza Sanchez</option></select></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                preConfirm: () => {
                    
                    return [
                        this.nombre = Swal.getPopup().querySelector('#nombre').value,
                        this.codigo = Swal.getPopup().querySelector('#codigo').value,
                        this.nivelFormacion = Swal.getPopup().querySelector('#nivelFormacion').value,
                        this.nroEstudiantes = Swal.getPopup().querySelector('#nroEstudiantes').value,
                        this.programa = Swal.getPopup().querySelector('#programa').value,
                        this.area = Swal.getPopup().querySelector('#area').value,
                        this.docente = Swal.getPopup().querySelector('#docente')
                    ]
                }
            })
            if (this.nombre=="" || this.codigo==0 || this.nivelFormacion=="" || this.nroEstudiantes==0 || this.programa==0 || this.area==0 || this.docente==0) {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            }
            else {
                this.agregarAsignatura();
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '¡Asignatura creada Agregado!'
                })
            }
        },
        btnEditarUser: async function () { },
        btnDeshabilitarUser: async function () { },

        //Procedimientos
        traerPrograma: function(){
            axios.post(url,{opcion:1}).then(response=>{

                this.filtroProgramas = response.data;
                this.areaSeleccionada=0;
                this.filtroAreas="";
                this.semestreSeleccionado=0;
            });
        },

        traerArea: function(){
            axios.post(url,{opcion:2, programa:this.programaSeleccionado}).then(response=>{

                this.filtroAreas = response.data;
                this.areaSeleccionada=0;
                this.semestreSeleccionado=0;
            })
        },

        listarAsignatura: function(){
            axios.post(url,{opcion:6}).then(response=>{

                this.datosAsignatura = response.data;
                console.log(this.datos);
            });
        },

        agregarAsignatura: function(){
            axios.post(url, {opcion:4, nombre:this.nombre, codigo:this.codigo ,nivelFormacion:this.nivelFormacion, nroEstudiantes:this.nroEstudiantes, programa:this.programa, area:this.area, docente:this.docente }).then(response =>{
                this.listarAsignatura();
            });        
             this.nombre = "",
             this.codigo = 0,
             this.nivelFormacion = "",
             this.nroEstudiantes = 0
        },
    },
    created:function(){
        this.listarUsuarios();
    }
});