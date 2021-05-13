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
                    text: 'Por favor complete todos los campos del criterio de evaluación'
                });
            }else{

                this.criterios.push({

                    concepto: concepto,
                    tipo: tipo,
                    instrumento: instrumento,
                    valor: valor,
                    fecha: fecha
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
        },

        btnAgregarBiblioBasica: async function(){
            var sigTopografica = document.getElementById("basicaSignatura").value;
            var basicaBiblio = document.getElementById("basicaBiblio").value;

            if(sigTopografica=="" || basicaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioBasica.push({
                    sigTopografica: sigTopografica,
                    basicaBiblio: basicaBiblio
                });

                document.getElementById("basicaSignatura").value="";
                document.getElementById("basicaBiblio").value="";
            }
        },

        btnQuitarBiblioBasica: async function(basica){
            this.biblioBasica.splice(basica,1);
        },

        
    },

    

    created:function(){
        
    }
});                                 