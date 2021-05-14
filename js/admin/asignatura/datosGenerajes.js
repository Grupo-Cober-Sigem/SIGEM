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

        btnAgregarBiblioSeriada: async function(){
            var sigTopografica = document.getElementById("seriadaSignatura").value;
            var seriadaBiblio = document.getElementById("seriadaBiblio").value;

            if(sigTopografica=="" || seriadaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioSeriadas.push({
                    sigTopografica: sigTopografica,
                    seriadaBiblio: seriadaBiblio
                });

                document.getElementById("seriadaSignatura").value="";
                document.getElementById("seriadaBiblio").value="";
            }
        },

        btnQuitarBiblioSeriada: async function(seriada){
            this.biblioSeriadas.splice(seriada,1);
        },

        btnAgregarBiblioWeb: async function(){
            var webBiblio = document.getElementById("webBiblio").value;

            if(webBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioWeb.push({
                    webBiblio: webBiblio
                });

                document.getElementById("webBiblio").value="";
            }
        },

        btnQuitarBiblioWeb: async function(web){
            this.biblioWeb.splice(web,1);
        },

        btnAgregarBiblioSegundaLengua: async function(){
            var segundaLenguaBiblio = document.getElementById("segundaLenguaBiblio").value;

            if(segundaLenguaBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioSegundaLengua.push({
                    segundaLenguaBiblio: segundaLenguaBiblio
                });

                document.getElementById("segundaLenguaBiblio").value="";
            }
        },

        btnQuitarBiblioSegundaLengua: async function(segundaLengua){
            this.biblioSegundaLengua.splice(segundaLengua,1);
        },

        btnAgregarBiblioComplementaria: async function(){
            var sigTopografica = document.getElementById("complementarioSignatura").value;
            var complementarioBiblio = document.getElementById("complementarioBiblio").value;

            if(sigTopografica=="" || complementarioBiblio==""){

                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                    text: 'Por favor complete todos los campos del registro de bibliografia'
                });
            }else{

                this.biblioComplementaria.push({
                    sigTopografica: sigTopografica,
                    complementarioBiblio: complementariaBiblio
                });

                document.getElementById("complementarioSignatura").value="";
                document.getElementById("complementarioBiblio").value="";
            }
        },

        btnQuitarBiblioComplementaria: async function(complementaria){
            this.biblioComplementaria.splice(complementaria,1);
        },
    },

    

    created:function(){
        
    }
});                                 