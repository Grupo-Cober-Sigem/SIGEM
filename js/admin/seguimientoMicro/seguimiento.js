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
            
            if(this.dia=="" || this.hora=="" || this.nroEstudiantes=="" || this.sincronico=="" || 
                this.observaciones=="" || this.actividad=="" || this.soporte==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                })
            }else{
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
                    observaciones: this.observaciones,
                    soporte: this.soporte
    
                }).then(response=>{
                    this.listarSeguimientos();
                    Swal.fire(
                        '¡Registro exitoso!',
                        'El registro ha sido agregado.',
                        'success'
                      )
                });
            }

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
            this.asignaturaSeleccionada="",
            this.unidadSeleccionada="",
            this.subtemaSeleccionado=""

            this.limpiarModal();
        },

        btnCargarSeguimiento: async function (cod_seguimiento, asignatura, dia,
                                            hora, unidad, subtema, actividad,
                                            teams, elibre, estrategiaOtro,
                                            guias, word, diapositiva, videos,
                                            materialOtro, sincronico, participantes,
                                            observacion, soporte
                                            ){
                                                
            this.limpiarModal();
            document.getElementById("diaSeguimientoEdit").value = dia;
            document.getElementById("horaSeguimientoEdit").value = hora;
            document.getElementById("nroEstudiantesEdit").value = participantes;
            document.getElementById("asignaturaEdit").value = asignatura;
            document.getElementById("unidadEdit").value = unidad;
            document.getElementById("subtemaEdit").value = subtema;
            this.validarChechboxEdit(teams,document.getElementById("recursoTeamsEdit").checked);
            this.validarChechboxEdit(elibre,document.getElementById("recursoElibreEdit").checked);
            document.getElementById("recursoOtroEdit").value = estrategiaOtro;
            /*this.validarChechboxEdit(guias,document.getElementById("materialGuiaEdit").checked);
            this.validarChechboxEdit(word,document.getElementById("materialInstructivoEdit").checked);
            this.validarChechboxEdit(diapositiva,document.getElementById("materialDiapositivaEdit").checked);
            this.validarChechboxEdit(videos,document.getElementById("materialVideoEdit").checked);*/
            document.getElementById("materialOtroEdit").value = materialOtro;
            document.getElementById("actSincronicaEdit").value = sincronico;
            document.getElementById("observacionesEdit").value = observacion;
            document.getElementById("ActividadEdit").value = actividad;
            document.getElementById("soporteEdit").value = soporte;
            localStorage.setItem("codSeguimiento",cod_seguimiento);
        }, 

        btnEditarSeguimiento: async function(){

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
            var nControles= controles.length;

            for(var i=0;i<nControles;i++){
    
                controles[i].value="";
            }

            controles= document.getElementsByClassName("limpiarCheck");
            nControles = controles.length;

            for(var i=0;i<nControles;i++){

                controles[i].checked=false;
            }
            this.asignaturaSeleccionada=""
        },

        validarChechbox: function(valor){
            
            if(valor==true){

                return 1;
            }else{
                return 0;
            }
        },

        validarChechboxEdit: function(valor,checkBox){

            console.log("Contenido de VAlor; "+valor);
            console.log("Contenido de checkBox; "+checkBox);
            if(valor!=null || valor!="")
            {
                checkBox=true;
            }else{
                checkBox=false;
            }
        }
    },

    created:function(){
        this.listarSeguimientos();
        this.traerAsignatura();
    }
});                                 