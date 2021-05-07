var url = "../../../php/admin/seguimientoMicro/seguimiento.php";

var appUsuarios = new Vue({
    el: "#crearSeguimiento",
    data: {
        //Variables para filtros y combobox
        asignaturaSeleccionada:"",
        asignaturas:[],
        unidadSeleccionada:"",
        unidades:[],
        subtemaSeleccionado:"",
        subtemas:[],
        //Variables para gestión de registros
        datosSeguimientos:[],
        codSeguimiento:"",
        dia:"",
        hora:"",
        unidad:"",
        subtema:"",
        actividad:"",
        recursoTeams:0,
        recursoElibre:0,
        recursoOtro:"",
        materialGuias:0,
        materialWord:0,
        materialDiapositiva:0,
        materialVideos:0,
        materialOtro:"",
        sincronico:"",
        nroEstudiantes:0,
        observaciones:"",
        soporte:""
    
    },
    methods: {
        btnAgregarSeguimiento: async function () {
            this.limpiarModal();

            this.dia = document.getElementById("diaSeguimiento").value;
            this.hora = document.getElementById("horaSeguimiento").value;
            this.nroEstudiantes = document.getElementById("nroEstudiantes").value;
            this.recursoTeams = this.validarChechbox(document.getElementById("recursoTeams").checked);
            this.recursoElibre = this.validarChechbox(document.getElementById("recursoElibre").checked);
            this.recursoOtro = document.getElementById("recursoOtro").value;
            this.materialGuias = this.validarChechbox(document.getElementById("materialGuia").checked);
            this.materialWord = this.validarChechbox(document.getElementById("materialInstructivo").checked);
            this.materialDiapositiva = this.validarChechbox(document.getElementById("materialDiapositiva").checked);
            this.materialVideos = this.validarChechbox(document.getElementById("materialVideo").checked);
            this.materialOtro = document.getElementById("materialOtro").value;
            this.sincronico = document.getElementById("actSincronica").value;
            this.observaciones = document.getElementById("observaciones").value;
            this.actividad = document.getElementById("Actividad").value;
            this.soporte = document.getElementById("soporte").value;

            axios.post(url,{opcion:5, 
                asignatura:this.asignaturaSeleccionada,
                codigoUser:localStorage.getItem("usuario"),
                hora: this.hora,
                dia: this.dia,
                unidad: this.unidadSeleccionada,
                subtema: this.subtemaSeleccionado,
                actividad: this.actividad,
                teams: this.recursoTeams,
                elibre: this.recursoElibre,
                estrategiaOtro: this.recursoOtro,
                guias: this.materialGuias,
                word: this.materialWord,
                diapositiva: this.materialDiapositiva,
                video: this.materialVideos,
                materialOtro: this.materialOtro,
                actSincronica: this.sincronico,
                nroEstudiantes: this.nroEstudiantes,
                soporte: this.soporte

            }).then(response=>{
                this.listarSeguimientos();
                Swal.fire(
                    '¡Registro exitoso!',
                    'El registro ha sido agregado.',
                    'success'
                  )
            });

            this.dia="",
            this.hora="",
            this.nroEstudiantes=0,
            this.recursoTeams=0,
            this.recursoElibre=0
            this.recursoOtro="",
            this.materialGuias=0,
            this.materialWord=0,
            this.materialDiapositiva=0,
            this.materialVideos=0,
            this.materialOtro="",
            this.sincronico="",
            this.observaciones="",
            this.actividad="",
            this.soporte=""
        },

        btnEditarSeguimiento: async function (cod_user,nombre,apellidos,email,pass,rol) {
            let nombreRol="";
            switch(rol)
            {
                case "3":
                    nombreRol="Decano";
                    break;
                case "2":
                    nombreRol="Jefe de Area";
                    break;
                case "1":
                    nombreRol="Docente";
                    break;
            }
            
            await Swal.fire({
                title: 'Editar',
                html:
                '<div class="form-group"><div class="row"><label class="col-form-label"></label></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-4 col-form-label text-left">Nombres</label><div class="col-sm-8"><input id="nombre" value="'+nombre+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-4 col-form-label text-left">Apellidos</label><div class="col-sm-8"><input id="apellidos" value="'+apellidos+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-6 col-form-label text-left">Nro. de Identificación</label><div class="col-sm-6"><input id="cod_user" value="'+cod_user+'"type="number" min="0" class="form-control" disabled></div></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-5 col-form-label text-left">Email Unilibre</label><div class="col-sm-7"><input id="email" value="'+email+'" type="text" class="form-control"></div></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-4 col-form-label text-left">Contraseña</label><div class="col-sm-8"><input id="pass" value="'+pass+'"type="password" class="form-control"></div></div></div><div class="form-group"><div class="row">'+
                    '<label class="col-sm-4 col-form-label text-left">Rol</label><div class="col-sm-8"><select class="form-control" id="rol">'+
                        '<option value="'+rol+'" disabled selected>'+nombreRol+'</option>'+
                        '<option value="1">Docente</option><option value="2">Jefe de Area</option>'+
                        '<option value="3">Decano</option></select></div></div></div>', 
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: "Cancelar",

                }).then((result) => {
                  if (result.value) {                                             
                    nombre = Swal.getPopup().querySelector('#nombre').value,
                    apellidos = Swal.getPopup().querySelector('#apellidos').value,
                    cod_user = Swal.getPopup().querySelector('#cod_user').value,
                    email = Swal.getPopup().querySelector('#email').value,
                    pass = Swal.getPopup().querySelector('#pass').value,
                    rol = Swal.getPopup().querySelector('#rol').value                    

                    this.editarUsuarios(cod_user,pass,nombre,apellidos,email,rol);
                    Swal.fire(
                      '¡Actualizado!',
                      'El registro ha sido actualizado.',
                      'success'
                    )                  
                  }
                });
        },

        //Procedimientos
        traerAsignatura: function(){
            axios.post(url,{opcion:2}).then(response=>{

                this.asignaturas = response.data;
                this.unidadSeleccionada="";
                this.unidades=[];
                this.subtemaSeleccionado="";
                this.subtemas=[];
            });
        },

        traerUnidades: function(){
            axios.post(url,{opcion:3, asignatura:this.asignaturaSeleccionada}).then(response=>{

                this.unidades = response.data;
                this.unidadSeleccionada="";
                this.subtemas=[];
                this.subtemaSeleccionado="";
            });
        },

        traerSubtemas: function(){
            axios.post(url,{opcion:4, unidad:this.unidadSeleccionada}).then(response=>{

                this.subtemas = response.data;
                this.subtemaSeleccionado="";
            });
        },

        listarSeguimientos: function(){
            axios.post(url,{opcion:1}).then(response=>{

                this.datosSeguimientos = response.data;
                this.datosSeguimientos.map(function(seguimiento){

                    if(seguimiento.estrategiaTeams=="1"){
                        seguimiento.estrategiaTeams="Microsoft Teams.";
                    }else{
                        seguimiento.estrategiaTeams="";
                    }
    
                    if(seguimiento.estrategiaElibre=="1"){
                        seguimiento.estrategiaElibre="Plataforma Elibre.";
                    }else{
                        seguimiento.estrategiaElibre="";
                    }
    
                    if(seguimiento.materialGuias=="1"){
                        seguimiento.materialGuias="Guia de aprendizaje.";
                    }else{
                        seguimiento.materialGuias="";
                    }
                    
                    if(seguimiento.materialWord=="1"){
                        seguimiento.materialWord="Instructivo en excel o word.";
                    }else{
                        seguimiento.materialWord="";
                    }

                    if(seguimiento.materialDiapositiva=="1"){
                        seguimiento.materialDiapositiva="Presentación diapositivas.";
                    }else{
                        seguimiento.materialDiapositiva="";
                    }
    
                    if(seguimiento.materialVideos=="1"){
                        seguimiento.materialVideos="Videos.";
                    }else{
                        seguimiento.materialVideos="";
                    }
                });
            });            
        },

        limpiarModal: function(){

            var controles= document.getElementsByClassName("limpiar");
            var ncontroles= controles.length;

            for(var i=0;i<ncontroles;i++){
    
                controles[i].value="";
            }
        },

        validarChechbox: function(valor){
            
            if(valor==true){

                return 1;
            }else{
                return 0;
            }
        }
    },

    created:function(){
        this.listarSeguimientos();
        this.traerAsignatura();
    }
});                                 