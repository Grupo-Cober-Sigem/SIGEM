var url = "../../../php/jefearea/seguimientoMicro/seguimientoAprobadoxja.php";
var appUsuarios = new Vue({
    el: "#seguimientoAprobado",
    data:{
        datosSeguimientos:[]
    },
    methods: {
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
    },

    created:function(){
        this.listarSeguimientos();
    }
});
