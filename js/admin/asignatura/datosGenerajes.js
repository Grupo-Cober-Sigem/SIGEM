var url ="";
var appUsuarios = new Vue({
    el: "#seccionDatosGenerales",
    data: {
        datosBasicos:[]
    },
    methods: {
        
        listarDatos: function(){
            let cod_asignatura = localStorage.getItem("cod_asignatura");

            axios.post(url,{opcion:1}).then(response=>{
            })
        },
    },

    created:function(){
        
    }
});                                 