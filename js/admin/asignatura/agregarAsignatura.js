var url = "../../../../php/admin/asignatura/asignatura.php";
var appAsignatura = new Vue({
    el: "#seccionAsignatura",
    data: {
        //Variables para filtros
        programaSeleccionado:0,
        filtroProgramas:[],
        areaSeleccionada:0,
        filtroAreas:[],
        semestreSeleccionado:0,
        docentes:[],
        //Variables para registros
        datosAsignatura:[],
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
/*# Estudiantes*/   '<div class="col"><div class="form-group"><label for="nroEstudiantes" class="col-form-label">Estudiantes</label><input type="text" class="form-control" placeholder="Cantidad" id="nroEstudiantes">'+
                    '</div></div></div><div class="form-group">'+
/*Programa*/        '<label for="programa" class="col-form-label">Programa de la asignatura</label><select class="form-control" id="programa">'+
                        '<option value="0" disabled>Nombre del programa</option>'+
                        this.filtroProgramas.map(programa=>
                            '<option value="'+programa.Cod_programa+'">'+programa.Nombre_prog+'</option>'
                        )
                        + '</select></div><div class="form-group">'+
/*Area*/            '<label for="area" class="col-form-label">Área de la asignatura</label><select class="form-control" id="area">'+
                        '<option value="0" disabled>Nombre del área</option>'+
                        this.filtroAreas.map(area=>
                            '<option value="'+area.Cod_Area+'">'+area.Nombre_Area+'</option>'
                        )
                        +'</select></div><div class="form-group">'+
/*Docente*/         '<label for="docente" class="col-form-label">Docente</label><select class="form-control" id="docente">'+
                        '<option value="0" disabled >Nombre del docente</option>'+
                        this.docentes.map(docente=>
                            '<option value="'+docente.Cod_User+'">'+docente.Nombres+' '+docente.Apellidos+'</option>'
                        )
                        +'</select></div>',
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
                        this.docente = Swal.getPopup().querySelector('#docente').value
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

        btnEditarAsignatura: async function (nombre,codigo,semestre,docente,area,programa,nroEstudiantes) {
            await Swal.fire({
                title: 'Editar',
                html:'<div class="form-group">'+
/*Nombre*/          '<label for="nombre" class="col-form-label">Nombre</label><input type="text" class="form-control" id="nombre" value="'+nombre+'"></div>'+
                    '<div class="row"><div class="col"><div class="form-group">'+
/*Codigo */         '<label for="codigo" class="col-form-label">Código</label><input type="text" class="form-control" id="codigo" value="'+codigo+'" disabled></div></div>'+
/*Semestre*/        '<div class="col"><div class="form-group"><label for="nivelFormacion" class="col-form-label">Semestre</label><select class="form-control" id="nivelFormacion">'+
                        '<option value="'+semestre+'" selected disabled>'+semestre+'</option>'+
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
/*# Estudiantes*/   '<div class="col"><div class="form-group"><label for="nroEstudiantes" class="col-form-label">Estudiantes</label><input type="text" class="form-control" placeholder="Cantidad" id="nroEstudiantes" value="'+nroEstudiantes+'">'+
                    '</div></div></div><div class="form-group">'+
/*Programa*/        '<label for="programa" class="col-form-label">Programa de la asignatura</label><select class="form-control" id="programa">'+
                        '<option value="'+programa+'">Nombre del programa</option>'+
                        this.filtroProgramas.map(programa=>
                            '<option value="'+programa.Cod_programa+'">'+programa.Nombre_prog+'</option>'
                        )
                        +'</select></div><div class="form-group">'+
/*Area*/            '<label for="area" class="col-form-label">Área de la asignatura</label><select class="form-control" id="area">'+
                        '<option value="'+area+'">Nombre del área</option>'+
                        this.filtroAreas.map(area=>
                            '<option value="'+area.Cod_Area+'">'+area.Nombre_Area+'</option>'
                        )
                        +'<option value="1">Nombre del área</option></select></div><div class="form-group">'+
/*Docente*/         '<label for="docente" class="col-form-label">Docente</label><select class="form-control" id="docente">'+
                        '<option value="'+docente+'"></option>'+
                        this.docentes.map(docente=>
                            '<option value="'+docente.Cod_User+'">'+docente.Nombres+' '+docente.Apellidos+'</option>'
                        )
                        +'</select></div>', 
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                showLoaderOnConfirm: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: '#CB3234',

                }).then((result) => {
                  if (result.value) {                                             
                    nombre = Swal.getPopup().querySelector('#nombre').value,
                    codigo = Swal.getPopup().querySelector('#codigo').value,
                    nivelFormacion = Swal.getPopup().querySelector('#nivelFormacion').value,
                    nroEstudiantes = Swal.getPopup().querySelector('#nroEstudiantes').value,
                    programa = Swal.getPopup().querySelector('#programa').value,
                    area = Swal.getPopup().querySelector('#area').value,
                    docente = Swal.getPopup().querySelector('#docente').value                      

                    this.editarAsignatura(codigo,nombre,nivelFormacion,area,docente);
                    Swal.fire(
                      '¡Actualizado!',
                      'El registro ha sido actualizado.',
                      'success'
                    )                  
                  }
                });
        },

        btnFiltrarAsignatura: async function()
        {
            let nombre = document.getElementById("campoBusqueda").value;

            switch(nombre)
            {
                case "":
                    this.listarAsignatura();
                    break;

                case null:
                    this.listarAsignatura();
                    break;
                
                default:
                    axios.post(url,{opcion:5,nombre:nombre}).then(response=>{
                        this.datosAsignatura = response.data;
                        
                        nombre="";
                    });
                    break;
            }
        },

        btnDatosGenerales: async function (codigo){
            localStorage.setItem("cod_asignatura",codigo);
            document.location.href="edicionasigxadmin.html"
        },

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
            axios.post(url,{opcion:2}).then(response=>{

                this.filtroAreas = response.data;
                this.areaSeleccionada=0;
                this.semestreSeleccionado=0;
            })
        },

        traerUsuarios: function(){
            axios.post(url,{opcion:3}).then(response=>{

                this.docentes = response.data;
            });
        },
          
        listarAsignatura: function(){
            axios.post(url,{opcion:6}).then(response=>{

                this.datosAsignatura = response.data;
                console.log(this.datosAsignatura);
            });
        },

        editarAsignatura:function(codigo, nombre, nivelFormacion, area, docente){
            axios.post(url,{opcion:7, nombre:nombre, codigo:codigo, nivelFormacion:nivelFormacion, area:area, docente:docente}).then(response => {
                this.listarAsignatura();
                Swal.fire(
                    '¡Actualizado!',
                    'El registro ha sido editado con éxito.',
                    'success'
                  )
            });
        },

        agregarAsignatura: function(){
            axios.post(url, {opcion:4, nombre:this.nombre, codigo:this.codigo ,nivelFormacion:this.nivelFormacion, nroEstudiantes:this.nroEstudiantes, area:this.area, docente:this.docente }).then(response =>{
                this.listarAsignatura();
            });        
             this.nombre = "",
             this.codigo = 0,
             this.nivelFormacion = "",
             this.nroEstudiantes = 0,
             this.programa=0,
             this.area=0,
             this.docente=0
        },
    },
    created:function(){
        this.listarAsignatura();
        this.traerPrograma();
        this.traerArea();
        this.traerUsuarios();
    }
});
