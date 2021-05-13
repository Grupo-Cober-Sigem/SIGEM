var url = "../../../php/admin/seguimientoMicro/seguimientoRevision.php";
var appUsuarios = new Vue({
    el: "#revisarSeguimiento",
    data: {
        //Variables para gestión de registros
        datosSeguimientos:[]
    },
    methods: {

        aprobarRegistro: async function(codSeguimiento){
            axios.post(url,{opcion:2, codigoSegui:codSeguimiento}).then(response=>{

                this.listarSeguimientos();
                    Swal.fire(
                        '¡Registro exitoso!',
                        'El registro ha sido aprobado con éxito.',
                        'success'
                      )
            });
        },

        cargarObservacion: async function(codSeguimiento){
            localStorage.setItem("codSeguimiento",codSeguimiento);
        },

        rechazarRegistro: async function(){

            var observacionJefe = document.getElementById("observacionesJefe").value;
            var codSeguimiento = localStorage.getItem("codSeguimiento");
            
            if(observacionJefe=="" || observacionJefe==null){

                localStorage.removeItem("codSeguimiento");
                Swal.fire({
                    icon: 'info',
                    title: 'Por favor digite una observación.',
                })
            }else{

                Swal.fire({
                    title: '¿Está seguro?',
                    text: "La observación se realizará, y el registro quedará rechazado inmediatamente.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#1cc88a',
                    cancelButtonColor: '#CB3234',
                    confirmButtonText: 'Aceptar',
                    cancelButtonColor: 'Cancelar'

                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.post(url,{opcion:3,observacionJefe:observacionJefe,codigoSegui:codSeguimiento}).then(response=>{

                            localStorage.removeItem("codSeguimiento");
                            this.listarSeguimientos();
                            Swal.fire(
                                '¡Registro exitoso!',
                                'El registro ha sido rechazado con éxito.',
                                'success'
                              )
                        });
                    }
                })
            }
        },

        //Procedimientos
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

            document.getElementById("observacionesJefe").value=""; 
        },
    },

    created:function(){
        this.listarSeguimientos();
    }
});      