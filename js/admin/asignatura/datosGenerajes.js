var url ="";
var appUsuarios = new Vue({
    el: "#seccionDatosGenerales",
    data: {
        //Arrays con datos de la asignatura
        criterios:[],
        biblioBasica:[],
        biblioSeriadas:[],
        biblioWeb:[],
        biblioSegundaLengua:[],
        biblioComplementaria:[],
        unidadesEdit:[],
        subtemasEdit:[],
        //Arrays y variables para resto de datos
        nombre:"",
        codAsig:"",
        area:0,
        ubicacion:"",
        caracter:"",
        tipo:"",
        horaPresencial:"",
        horaIndependiente:""
    },
    methods: {
        btnAgregarCriterio: async function(){
            var concepto= document.getElementById("criteConcepto").value;
            var tipo= document.getElementById("criteTipo").value;
            var instrumento= document.getElementById("criteInstrumento").value;
            var valor= document.getElementById("critePorcentaje").value;
            var fecha= document.getElementById("criteFecha").value;

            if(concepto=="" || tipo=="" || instrumento=="" || valor=="" || fecha==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                });
            }else{

                this.criterios.push({

                    concepto: document.getElementById("criteConcepto").value,
                    tipo: document.getElementById("criteTipo").value,
                    instrumento: document.getElementById("criteInstrumento").value,
                    valor: document.getElementById("critePorcentaje").value,
                    fecha: document.getElementById("criteFecha").value
                });
    
                document.getElementById("criteConcepto").value="";
                document.getElementById("criteTipo").value="";
                document.getElementById("criteInstrumento").value="";
                document.getElementById("critePorcentaje").value="";
                document.getElementById("criteFecha").value="";
            }
        },

        btnQuitarCriterio: async function(criterio){

            this.criterios.splice(criterio,1);
        }
    },

    

    created:function(){
        
    }
});                                 